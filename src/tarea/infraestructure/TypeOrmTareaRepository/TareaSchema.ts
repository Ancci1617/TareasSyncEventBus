import { EntitySchema } from "typeorm";
import {Tarea} from "../../domain/Tarea";
import { TareaId } from "../../domain/value_objects/TareaId";
import { UserId } from "../../../user/domain/value_objects/UserId";

export const TareaSchema = new EntitySchema<Tarea>({
    name : "Tarea",
    tableName : "tarea",
    target : Tarea,
    columns : {
        id : {
            type : String,
            primary : true,
            nullable : false,
            transformer : {
                from : (value : string) => new TareaId(value),
                to : (value : TareaId) => value.getValue()
            }
        },

        nombre :{
            type : String,
            nullable : false
        },

        fechaDeRealizacion : {
            type : String,
            nullable : false,
            transformer : {
                from : (value : string) => new Date(value),
                to : (value : Date) => value.toISOString()
            }
        },
        creadaPor : {
            type : String,
            nullable : false,
            transformer : {
                from : (value : string) => new UserId(value),
                to : (value : UserId) => value.getValue()
            }
        },

        estadoDeTarea : {
            type : "enum",
            enum : ["PENDIENTE", "REALIZADA"],
            nullable : false
        },
        fechaDeCreacion : {
            type : String,
            nullable : false,
            transformer : {
                from : (value : string) => new Date(value),
                to : (value : Date) => value.toISOString()
            }
        }
    }


})

