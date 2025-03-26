import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from '../entities/order.entity';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    create(@Body() createOrderDto: CreateOrderDto): Order {
        return this.ordersService.create(createOrderDto);
    }

    @Get()
    findAll(): Order[] {
        return this.ordersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Order {
        return this.ordersService.findOne(id); // Error occurs here
    }
}