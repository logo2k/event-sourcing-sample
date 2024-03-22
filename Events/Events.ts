export class BaseEvent {
    eventId: string;
    aggregateId: string;
    aggregateType: string;
    eventType: string;
    localTime: number;
    version: number;
    replicaInfo: string;

    constructor(aggregateId: string, aggregateType: string) {
        this.eventId = "08d776f5-dae2-4b7d-a1f1-b8878fce302a";//uuid.v4();
        this.eventType = this.constructor.name;
        this.aggregateId = aggregateId;
        this.aggregateType = aggregateType;
        this.localTime = Date.now();
    }
}

export class BaseOrderEvent extends BaseEvent {
    constructor(aggregateId: string) {
        super(aggregateId, "Order");
    }
}

export class OrderCreated extends BaseOrderEvent { 
    customerId: string;
    constructor(aggregateId: string, customerId: string) {
        super(aggregateId);
        this.customerId = customerId;
    }
}
export class ProductAdded extends BaseOrderEvent { 
    productId: string;
    quantity: number;
    constructor(aggregateId: string, productId: string, quantity: number) {
        super(aggregateId);
        this.productId = productId;
        this.quantity = quantity;
    }
}
export class ProductRemoved extends BaseOrderEvent {
    productId: string;
    quantity: number;
    constructor(aggregateId: string, productId: string, quantity: number) {
        super(aggregateId);
        this.productId = productId;
        this.quantity = quantity;
    }
}
export class OrderPlaced extends BaseOrderEvent {
    constructor(aggregateId: string) {
        super(aggregateId);
    }
}
export class OrderCancelled extends BaseOrderEvent {
    constructor(aggregateId: string) {
        super(aggregateId);
    }
}