import { DomainEvent } from "../../domain/DomainEvent";
import { DomainEventSubscriber } from "../../domain/DomainEventSubscriber";
import { SyncEventBus } from "../../domain/interfaces/SyncEventBus";

export class MapSyncEventBus 
    extends Map<string,Array<DomainEventSubscriber<DomainEvent>>> 
    implements SyncEventBus{

    get(eventName : string) {
        return super.get(eventName) || [];
    }


    async publish(events: DomainEvent[]): Promise<void> {
        for (const event of events){

            const subscribers = this.get(event.eventName);
            
            for (const subscriber of subscribers){
                await subscriber.on(event);
            }

        }
    }

    async addSubscribers(subscriber: DomainEventSubscriber<DomainEvent>[]): Promise<void> {
        
        subscriber.forEach((subscriber) => {
            this.set(
                subscriber.listeningTo().eventName,
                this.get(subscriber.listeningTo().eventName).concat(subscriber)
            )            
        })
        
    }



}