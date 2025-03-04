import { DomainEvent, DomainEventClass } from "./DomainEvent";

export const DomainEventSubscriber_INJECTION_TOKEN = "DomainEventSubscriber";
export interface DomainEventSubscriber<T extends DomainEvent>  {


    listeningTo() : DomainEventClass;


    on(event : T) : Promise<void>

}
