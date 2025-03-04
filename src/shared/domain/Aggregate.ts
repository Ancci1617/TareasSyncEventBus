import { DomainEvent } from "./DomainEvent";

export abstract class Aggregate{

    private events : DomainEvent[] = [];
    
    pullEvents(){
        
        const clone = this.events.slice();
        this.events = [];
        return clone;
    }
    recordEvent(event : DomainEvent){
        this.events.push(event);
    }
}