export class ItemDto {
    name: string;
    description: string;
    quantity: number;
    pricePerItem: number;
    totalPrice: number;
}

export class CreateOrderDto {
    items: ItemDto[];
    totalCost: number;
    subscriptionLimit: number;
    remainingItems: number;
}