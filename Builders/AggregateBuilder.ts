import { BaseEvent } from "../Events/Events";

export abstract class AggregateBuilder<TProps> {
    public props: TProps = {} as TProps;

    private readonly handlers: {
        [eventType: string]: (event: BaseEvent) => void;
    } = {};

    protected register<T extends BaseEvent>(event: new (...args: any[]) => T, handler: (event: T) => void) {
        this.handlers[event.name] = handler;
    }

    public apply(event: BaseEvent) {
        this.handlers[event.eventType](event);
    }

    public applyBulk(events: BaseEvent[]) {
        events.forEach((event: BaseEvent) => this.handlers[event.eventType](event));
    }
}