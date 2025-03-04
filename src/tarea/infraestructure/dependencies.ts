import { container } from "tsyringe";
import {TareaRepository,TareaRepository_INJECTION_TOKEN} from "../domain/interfaces/TareaRepository"
import { TypeOrmTareaRepository } from "./TypeOrmTareaRepository/TypeOrmTareaRepository";

import { CreateTareaDetalleOnTareaCreada } from "../../TareaDetalle/application/CreateTareaDetalleOnTareaCreada"
import {DomainEventSubscriber,DomainEventSubscriber_INJECTION_TOKEN} from "../../shared/domain/DomainEventSubscriber"
import { DomainEvent } from "../../shared/domain/DomainEvent";
import {TareaDetalleRepository,TareaDetalleRepository_INJECTION_TOKEN} from "../../TareaDetalle/domain/interfaces/TareaDetalleRepository"
import {TypeOrmTareaDetalleRepository} from "../../TareaDetalle/infraestructure/TypeOrmTareaDetalleRepository/TypeOrmTareaDetalleRepository"

container.registerSingleton<TareaRepository>(TareaRepository_INJECTION_TOKEN, TypeOrmTareaRepository);

container.registerSingleton<TareaDetalleRepository>(TareaDetalleRepository_INJECTION_TOKEN,TypeOrmTareaDetalleRepository);

container.registerSingleton<DomainEventSubscriber<DomainEvent>>(DomainEventSubscriber_INJECTION_TOKEN,CreateTareaDetalleOnTareaCreada);

