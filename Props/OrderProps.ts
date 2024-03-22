export class OrderProps {
    orderId: string;
    customerId: string;
    products: { productId: string, quantity: number }[];
    isPlaced: boolean;
    isCancelled: boolean;
}