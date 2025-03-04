import { container } from "tsyringe"
import {SyncEventBus, SyncEventBus_INJECTION_TOKEN} from "../shared/domain/interfaces/SyncEventBus"
import {DomainEventSubscriber, DomainEventSubscriber_INJECTION_TOKEN} from "../shared/domain/DomainEventSubscriber"
import { DomainEvent } from "../shared/domain/DomainEvent";
export function startSyncEventBus(){

    const syncEventBus = container.resolve<SyncEventBus>(SyncEventBus_INJECTION_TOKEN)
    
    const subscribers = container.resolveAll<DomainEventSubscriber<DomainEvent>>(DomainEventSubscriber_INJECTION_TOKEN);

    syncEventBus.addSubscribers(subscribers)

    console.log("SYNC EVENT BUS STARTED");
}