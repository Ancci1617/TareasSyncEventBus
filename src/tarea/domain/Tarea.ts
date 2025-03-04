import { Aggregate } from "../../shared/domain/Aggregate";
import {v4 as uuid} from "uuid";
import { UserId } from "../../user/domain/value_objects/UserId";
import { TareaId } from "./value_objects/TareaId";
import { TareaCreadaDomainEvent } from "./DomainEvents/TareaCreadaDomainEvent";
import { User } from "../../user/domain/User";

export type ESTADO_DE_TAREA = "PENDIENTE" | "REALIZADA";

export class Tarea extends Aggregate{


    constructor(
        readonly id : TareaId,
        readonly nombre : string,
        readonly fechaDeRealizacion : Date,
        readonly creadaPor : UserId,
        readonly estadoDeTarea : ESTADO_DE_TAREA,
        readonly fechaDeCreacion : Date
    ){super()}

    getId(){
        return this.id
    }

    toPrimitives(){
        return {
            id : this.id.getValue(),
            nombre : this.nombre,
            fechaDeRealizacion : this.fechaDeRealizacion.toISOString(),
            creadaPor : this.creadaPor.getValue(),
            estadoDeTarea : this.estadoDeTarea,
            fechaDeCreacion : this.fechaDeCreacion.toISOString()
        }
    }
    static crearTarea(params : {
        nombre : string,
        fechaDeRealizacion : Date,
        user : User
    }){
        const id = new TareaId(uuid());
        const estadoDeTarea : ESTADO_DE_TAREA = "PENDIENTE";
        const today = new Date();
        const tareaCreada =  new Tarea(
            id,
            params.nombre,
            params.fechaDeRealizacion,
            params.user.getId(),
            estadoDeTarea,
            today
        );
        tareaCreada.recordEvent(new TareaCreadaDomainEvent(params.user,tareaCreada));
        return tareaCreada;
    }

}