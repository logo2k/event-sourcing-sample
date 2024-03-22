import { EventStore } from "EventStore/event-store";
import { OrderAggregateBuilder } from "../Builders/OrderAggregateBuilder";
import { BaseEvent, OrderCreated, ProductAdded } from "../Events/Events";
import { OrderProps } from "../Props/OrderProps";
import { AggregateRoot } from "./AggregateRoot";

export class OrderAggregate extends AggregateRoot<OrderProps> {
    public id: string;
    eventStore: EventStore;
    constructor(builder: OrderAggregateBuilder, eventStore: EventStore) {
        super(builder);
        this.eventStore = eventStore;
    }

    // Phương thức để tạo đơn hàng
    public createOrder(customerId: string) {
        const event = new OrderCreated("259efbc1-4ae7-40a3-b1a2-a108ecf3794c", customerId);
        this.applyChange(event);
    }

    // Phương thức để thêm sản phẩm vào đơn hàng
    public addProduct(productId: string, quantity: number) {
        const event = new ProductAdded("259efbc1-4ae7-40a3-b1a2-a108ecf3794c", productId, quantity);
        this.applyChange(event);
    }

    public saveEvents() {
        const events = this.getUnCommitedEvents();
        this.eventStore.storeEvents(events);
        this.commitEvents();
    }
}