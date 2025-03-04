import { EntitySchema } from "typeorm";
import { TareaDetalleSchema } from "./TareaDetalleSchema";
import { TareaDetalle } from "../../domain/TareaDetalle";
import { TareaDetalleRepository } from "../../domain/interfaces/TareaDetalleRepository";
import { TypeOrmRepository } from "../../../shared/infraestructure/TypeOrm/TypeOrmRepository";

export class TypeOrmTareaDetalleRepository extends TypeOrmRepository<TareaDetalle> implements TareaDetalleRepository  {
    entitySchema(): EntitySchema<TareaDetalle> {
        return TareaDetalleSchema        
    }
    
    async save(tareaDetalle: TareaDetalle): Promise<void> {
        await this.repository().save(tareaDetalle);
    }
    async getAll(): Promise<Array<TareaDetalle>> {
        return await this.repository().find();
    }
    async getById(tareaId: string): Promise<TareaDetalle | null> {
        return await this.repository().findOne({where : {
            tareaId : tareaId
        }})
        
    }



    
    
}