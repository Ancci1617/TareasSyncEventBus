import {DataSource} from "typeorm";
import { TareaSchema } from "../../../tarea/infraestructure/TypeOrmTareaRepository/TareaSchema";
import { TareaDetalleSchema } from "../../../TareaDetalle/infraestructure/TypeOrmTareaDetalleRepository/TareaDetalleSchema";
import { UserSchema } from "../../../user/infraestructure/TypeOrmUserRepository/UserSchema";

export const dataSource = new DataSource({

    type: "mariadb",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123",
    database: "bgm_db",
    synchronize: true,
    logging: true,
    entities: [TareaSchema,TareaDetalleSchema,UserSchema]
})

export async function initDB(){
    if(dataSource.isInitialized) return;
    await dataSource.initialize();
    console.log("BASE DE DATOS INIZIALIZADA")
}
