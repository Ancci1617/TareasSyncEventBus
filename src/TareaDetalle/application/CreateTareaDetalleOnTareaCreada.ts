import { inject, injectable, singleton } from "tsyringe";

import {TareaDetalleRepository,TareaDetalleRepository_INJECTION_TOKEN} from "../domain/interfaces/TareaDetalleRepository"
import { TareaDetalle } from "../domain/TareaDetalle";
import { TareaCreadaDomainEvent } from "../../tarea/domain/DomainEvents/TareaCreadaDomainEvent";
import { DomainEventSubscriber } from "../../shared/domain/DomainEventSubscriber";
import { DomainEventClass } from "../../shared/domain/DomainEvent";
import { Transactional } from "../../shared/domain/decorators/Transactional";

@singleton()
export class CreateTareaDetalleOnTareaCreada implements DomainEventSubscriber<TareaCreadaDomainEvent> {

    constructor(
        @inject(TareaDetalleRepository_INJECTION_TOKEN)
        private tareaRepository :TareaDetalleRepository
    ){
        console.log("CreateTareaDetalleOnTareaCreada CREATED")
    }

    listeningTo(): DomainEventClass {
        return TareaCreadaDomainEvent;
    }

    @Transactional
    async on(event: TareaCreadaDomainEvent): Promise<void> {
        const {tarea,user} = event.getPayload();        

        await this.tareaRepository.save(new TareaDetalle({
            id : user.id,
            nombre : user.nombre
        },
        tarea.estadoDeTarea,
        tarea.fechaDeCreacion,
        tarea.nombre,
        tarea.fechaDeRealizacion,
        tarea.id));
        throw new Error("CreateTareaDetalleOnTareaCreada error arbitrario")
    }

}