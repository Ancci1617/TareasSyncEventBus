import { DomainEvent } from "../../../shared/domain/DomainEvent";
import { User } from "../../../user/domain/User";
import { Tarea } from "../Tarea";

export class TareaCreadaDomainEvent extends DomainEvent{

    static eventName : string = 'tarea.creada';
    eventName: string = TareaCreadaDomainEvent.eventName;

    constructor(
        private user : User,
        private tarea : Tarea
    ) {
        super();
    }

    getPayload(){
        const userPrimitives = this.user.toPrimitives();
        const tareaPrimitives = this.tarea.toPrimitives();
        return {
            user : {
                nombre : userPrimitives.nombreDeUsuario,
                id : userPrimitives.userId
            },
            tarea : tareaPrimitives
        }
    }
    

}