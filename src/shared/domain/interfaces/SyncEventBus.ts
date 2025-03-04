import { DomainEvent } from "../DomainEvent";
import { DomainEventSubscriber } from "../DomainEventSubscriber";

export const SyncEventBus_INJECTION_TOKEN = "SyncEventBus";
export interface SyncEventBus {

    publish(event : DomainEvent[]) : Promise<void>


    addSubscribers(subscribers : DomainEventSubscriber<DomainEvent>[]) : void;

}