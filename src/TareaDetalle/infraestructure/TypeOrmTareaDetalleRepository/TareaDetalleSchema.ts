import { Entity, EntitySchema } from "typeorm";
import { TareaDetalle } from "../../domain/TareaDetalle";



export const TareaDetalleSchema = new EntitySchema<TareaDetalle>({
    name : "TareaDetalle",
    tableName : "tarea_detalle",
    target : TareaDetalle,
    columns : {
        creadoPor : {
            type : "json",
            nullable : false,
        },
        estadoDeTarea : {
            type : String,
            nullable : false,
        },
        fechaDeCreacion : {
            type : String,
            nullable : false
        },
        fechaDeRealizacion : {
            type : String,
            nullable : false
        },
        nombre : {
            type : String,
            nullable : false
        },
        tareaId : {
            type : String,
            nullable : false,
            primary : true
        }
    }


})