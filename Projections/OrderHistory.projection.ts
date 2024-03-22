import { AggregateBuilder } from "Builders/AggregateBuilder";
import { BaseEvent, OrderCreated, OrderPlaced, ProductAdded, ProductRemoved } from "Events/Events";

interface OrderHistory {
    orderId: string;
    histories: string[];
}

class OrderHistoryProjectionBuilder extends AggregateBuilder<OrderHistory> {
    constructor() {
        super();
        this.props = {
            orderId: '',
            histories: []
        };
        this.register(OrderCreated, this.orderCreatedHandle);
        this.register(ProductAdded, this.productAddedHandle);
        this.register(ProductAdded, this.productAddedHandle);
    }

    private orderCreatedHandle = (event: OrderCreated) => {
        // Cập nhật trạng thái của projection dựa trên các sự kiện
        this.props.histories.push(`Đơn hàng đã được tạo`);
    }

    private productAddedHandle = (event: ProductAdded) => {
        // Cập nhật trạng thái của projection dựa trên các sự kiện
        this.props.histories.push(`Đã thêm sản phẩm ${event.productId} với số lượng ${event.quantity} vào đơn hàng`);
    }

    private productRemovedHandle = (event: ProductRemoved) => {
        // Cập nhật trạng thái của projection dựa trên các sự kiện
        this.props.histories.push(`Đã xóa ${event.quantity} sản phẩm ${event.productId} khỏi đơn hàng`);
    }
}

// Định nghĩa lớp OrderHistoryProjection
export class OrderHistoryProjection {
    private builder: OrderHistoryProjectionBuilder;

    constructor() {
        this.builder = new OrderHistoryProjectionBuilder();
    }

    // Phương thức để tải lịch sử sự kiện của một đơn hàng
    public loadOrderHistory(events: BaseEvent[]) {
        this.builder.applyBulk(events);
    }

    // Phương thức để lấy lịch sử sự kiện của một đơn hàng
    public getOrderHistory(): OrderHistory {
        return this.builder.props;
    }
}