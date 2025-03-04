import { ESTADO_DE_TAREA, Tarea } from "../../../src/tarea/domain/Tarea"
import {faker} from "@faker-js/faker"
import { TareaId } from "../../../src/tarea/domain/value_objects/TareaId"
import { UserId } from "../../../src/user/domain/value_objects/UserId";

export class TareaMother{


    static random(){
        const tareaId = new TareaId(faker.string.uuid());
        const userId = new UserId(faker.string.uuid());

        return new Tarea(
        tareaId,
        faker.string.alpha({length : 20}),
        faker.date.past(),
        userId,
        faker.helpers.arrayElement(["PENDIENTE","REALIZADA"]),
        faker.date.past());         

    }
    
}