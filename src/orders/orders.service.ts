import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from '../entities/order.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
    private orders: Order[] = [];

    create(createOrderDto: CreateOrderDto): Order {
        return;
    }

    findAll(): Order[] {
        return this.orders;
    }

    findOne(id: string): Order {
        const order = this.orders.find((order) => order.id === id);
        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    }
}