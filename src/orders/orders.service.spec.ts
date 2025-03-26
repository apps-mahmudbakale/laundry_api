import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, Item } from '../entities/order.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
  private orders: Order[] = [];

  create(createOrderDto: CreateOrderDto): Order {
    const order: Order = {
      id: uuidv4(),
      items: createOrderDto.items.map((item) => ({
        ...item,
        totalPrice: item.quantity * item.pricePerItem,
      })),
      totalCost: createOrderDto.totalCost,
      subscriptionLimit: createOrderDto.subscriptionLimit,
      remainingItems: createOrderDto.remainingItems,
      createdAt: new Date(),
    };

    this.orders.push(order);
    return order;
  }

  findAll(): Order[] {
    return this.orders;
  }

  findOne(id: string): Order {
    const order = this.orders.find((order) => order.id === id);
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  }
}