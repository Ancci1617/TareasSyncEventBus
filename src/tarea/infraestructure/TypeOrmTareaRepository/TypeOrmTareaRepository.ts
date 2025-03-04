import { EntitySchema } from "typeorm";
import { TypeOrmRepository } from "../../../shared/infraestructure/TypeOrm/TypeOrmRepository";
import { Tarea } from "../../domain/Tarea";
import {TareaSchema} from "./TareaSchema"
import { TareaRepository } from "../../domain/interfaces/TareaRepository";

export class TypeOrmTareaRepository  extends TypeOrmRepository<Tarea> implements TareaRepository{

    entitySchema(): EntitySchema<Tarea> {
        return TareaSchema;
    }
    
    async save(tarea: Tarea): Promise<void> {
        await this.repository().save(tarea);
        
    }

}