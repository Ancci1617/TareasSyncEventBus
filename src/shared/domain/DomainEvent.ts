export abstract class DomainEvent{

    abstract eventName : string;
    
    abstract getPayload() : any;
}

export type DomainEventClass = {
    eventName : string;
}