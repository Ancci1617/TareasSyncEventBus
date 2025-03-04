import { EntitySchema, Repository } from "typeorm";
import {dataSource} from "./TypeOrmDataSource";
import { container } from "tsyringe";
import {UnitOfWork_INJECTION_TOKEN} from "../../domain/interfaces/UnitOfWork"
import { AsyncLocalStorageUnitOfWork } from "../AsyncLocalStorageUnitOfWork/AsyncLocalStorageUnitOfWork";

const asyncLocalStorageUnitOfWork = container.resolve<AsyncLocalStorageUnitOfWork>(UnitOfWork_INJECTION_TOKEN)

export abstract class TypeOrmRepository<T extends Object> {

    abstract entitySchema(): EntitySchema<T>

    repository() : Repository<T>{
        if(asyncLocalStorageUnitOfWork.isInTransaction()){
            const {typeOrmQueryRunner : {manager}} = asyncLocalStorageUnitOfWork.getUnsecureStore();
            return manager.getRepository(this.entitySchema());
        }
        console.log("consultando repository",dataSource.isInitialized)
        return dataSource.getRepository(this.entitySchema());
    }

}