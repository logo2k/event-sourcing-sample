import { BaseEvent } from "Events/Events";

// Định nghĩa lớp Event Store
export class EventStore {
    private events: BaseEvent[] = [];

    // Phương thức để lưu trữ sự kiện
    public storeEvent(event: BaseEvent) {
        this.events.push(event);
    }

    public storeEvents(events: BaseEvent[]) {
        for (let event of events){
            this.events.push(event);
        }
    }

    // Phương thức để truy xuất sự kiện theo aggregateId
    public getEventsByAggregateId(aggregateId: string): BaseEvent[] {
        return this.events.filter(event => event.aggregateId === aggregateId);
    }
}