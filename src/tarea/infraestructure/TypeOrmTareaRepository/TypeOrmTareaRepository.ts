import { EntitySchema } from "typeorm";
import { TypeOrmRepository } from "../../../shared/infraestructure/TypeOrm/TypeOrmRepository";
import { Tarea } from "../../domain/Tarea";
import {TareaSchema} from "./TareaSchema"
import { TareaRepository } from "../../domain/interfaces/TareaRepository";
import { TareaId } from "../../domain/value_objects/TareaId";

export class TypeOrmTareaRepository  extends TypeOrmRepository<Tarea> implements TareaRepository{

    entitySchema(): EntitySchema<Tarea> {
        return TareaSchema;
    }
    
    async save(tarea: Tarea): Promise<void> {
        await this.repository().save(tarea);
        
    }

    async getById(tareaId: TareaId): Promise<Tarea | null> {
        return await this.repository().findOne({where : {id : tareaId}});
    }

}