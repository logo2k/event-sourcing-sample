import { AggregateBuilder } from "../Builders/AggregateBuilder";
import { BaseEvent } from "../Events/Events";

export abstract class AggregateRoot<TProps> {
    public abstract id: string;

    public version: number;

    protected get props(): TProps {
        return this.builder.props;
    }

    private events: BaseEvent[] = [];

    private builder: AggregateBuilder<TProps>;

    constructor(builder: AggregateBuilder<TProps>) {
        this.builder = builder;
        this.version = -1;
    }

    public applyChange(event: BaseEvent) {
        this.builder.apply(event);
        this.events.push(event);
    }

    public loadAggregateFromEvents(events: BaseEvent[]) {
        for (const event of events) {
            this.builder.apply(event);
            this.version = event.version > this.version ? event.version : this.version;
        }
    }

    public commitEvents() {
        this.events = [];
    }

    public getUnCommitedEvents() {
        return this.events;
    }
}