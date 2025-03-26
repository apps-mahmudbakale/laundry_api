export class Order {
    id: string;
    items: Item[];
    totalCost: number;
    subscriptionLimit: number;
    remainingItems: number;
    createdAt: Date;
}

export class Item {
    name: string;
    description: string;
    quantity: number;
    pricePerItem: number;
    totalPrice: number;
}