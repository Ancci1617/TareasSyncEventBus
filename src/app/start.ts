import "reflect-metadata"
import "./dependency_injection"
import { initDB } from "../shared/infraestructure/TypeOrm/TypeOrmDataSource"
import { GenerarTarea } from "../tarea/application/GenerarTarea"
import { container } from "tsyringe";
import { startSyncEventBus } from "./startSyncEventBus";
import { CrearUser } from "../user/application/CrearUser";
import { dataSource } from "../shared/infraestructure/TypeOrm/TypeOrmDataSource"
import {TareaSchema} from "../tarea/infraestructure/TypeOrmTareaRepository/TareaSchema"
import { Tarea } from "../tarea/domain/Tarea";
import { User } from "../user/domain/User";
import { UserId } from "../user/domain/value_objects/UserId";
import { PruebaTransacciones } from "./PruebaTransacciones";

/* async function init(){
    await initDB();
    startSyncEventBus();

    const createUser = container.resolve(CrearUser);
    await createUser.run();
    
    const service = container.resolve(GenerarTarea);
    await service.run({
        fechaString : "2025-03-03",
        nombre : "Tarea de prueba"
    })
} */

async function init(){
    await initDB();
    startSyncEventBus();
     try {
  

        const service = container.resolve(PruebaTransacciones);
        await service.run();
    } catch (error) {
        console.log("ERROR EN INIT")
        console.log(error)
    } 

}

init()