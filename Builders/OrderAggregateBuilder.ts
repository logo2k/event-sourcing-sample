import { OrderCancelled, OrderCreated, OrderPlaced, ProductAdded, ProductRemoved } from "../Events/Events";
import { OrderProps } from "../Props/OrderProps";
import { AggregateBuilder } from "./AggregateBuilder";

export class OrderAggregateBuilder extends AggregateBuilder<OrderProps> {
    constructor() {
        super();
        this.props = {
            orderId: '',
            customerId: '',
            products: [],
            isPlaced: false,
            isCancelled: false,
        };

        // Đăng ký các handler cho các loại sự kiện
        this.register(OrderCreated, this.handleOrderCreated);
        this.register(ProductAdded, this.handleProductAdded);
        this.register(ProductRemoved, this.handleProductRemoved);
        this.register(OrderPlaced, this.handleOrderPlaced);
        this.register(OrderCancelled, this.handleOrderCancelled);
    }

    // Handler cho sự kiện OrderCreated
    private handleOrderCreated(event: OrderCreated) {
        this.props.orderId = event.aggregateId;
        this.props.customerId = event.customerId;
    }

    // Handler cho sự kiện ProductAdded
    private handleProductAdded(event: ProductAdded) {
        this.props.products.push({ productId: event.productId, quantity: event.quantity });
    }

    // Handler cho sự kiện ProductRemoved
    private handleProductRemoved(event: ProductRemoved) {
        const index = this.props.products.findIndex(p => p.productId === event.productId);
        if (index !== -1) {
            this.props.products[index].quantity -= event.quantity;
            if (this.props.products[index].quantity <= 0) {
                this.props.products.splice(index, 1);
            }
        }
    }

    // Handler cho sự kiện OrderPlaced
    private handleOrderPlaced(event: OrderPlaced) {
        this.props.isPlaced = true;
    }

    // Handler cho sự kiện OrderCancelled
    private handleOrderCancelled(event: OrderCancelled) {
        this.props.isCancelled = true;
    }
}