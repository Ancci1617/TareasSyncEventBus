import { UnitOfWork } from "../../domain/interfaces/UnitOfWork";
import {AsyncLocalStorage} from "async_hooks"
import {PoolConnection} from "mysql2/promise";
import {dataSource} from "../TypeOrm/TypeOrmDataSource";
import { QueryRunner } from "typeorm";
import { pool } from "../Mysql/MysqlPool";

class NotUsingUnitOfWorkError extends Error {
    constructor(){
        super("UnitOfWork se intento ejecutar sin inizializarse la conexion.")
    }
}

type Store = {
    mysqlPoolConnection : PoolConnection,
    typeOrmQueryRunner : QueryRunner
}

export class AsyncLocalStorageUnitOfWork extends AsyncLocalStorage<Store> implements UnitOfWork{
    constructor(){
        super();
        console.log("constructed AsyncLocalStorageUnitOfWork")
    }

    async beginTransaction(callback : () => unknown){

        if(this.isInTransaction()){
            throw new Error("No se puede iniciar una transaccion dentro de una transaccion");
        }

        const queryRunner = dataSource.createQueryRunner();
        await queryRunner.startTransaction();

        const connection = await pool.getConnection();
        await connection.beginTransaction();

        
        console.log("CALLBACK RECIBIDO",callback)
        await this.run({
            mysqlPoolConnection : connection,
            typeOrmQueryRunner : queryRunner
        },callback);
//        this.run(connection,callback);
    }
   

    getUnsecureStore(){
        const storeValue = super.getStore();

        console.log("Por utilizar get store : ",storeValue)
        if(!storeValue)
            throw new NotUsingUnitOfWorkError();
        return storeValue;
    }
    
    
    isInTransaction(): boolean {
        return Boolean(super.getStore());    
    }
    
    async release(){
        const {mysqlPoolConnection,typeOrmQueryRunner} = this.getUnsecureStore();
        await typeOrmQueryRunner.release();
        mysqlPoolConnection.release();
    }

    async commit(): Promise<void> {
        const store = this.getUnsecureStore();
       
        await store.mysqlPoolConnection.commit();
        await store.typeOrmQueryRunner.commitTransaction();
        await this.release();
    }
    async rollback(): Promise<void> {
        const {mysqlPoolConnection,typeOrmQueryRunner} = this.getUnsecureStore();
        await mysqlPoolConnection.rollback();
        await typeOrmQueryRunner.rollbackTransaction();
        await this.release();
    }

}
