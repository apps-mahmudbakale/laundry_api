import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { LaundryServiceService } from './laundry-service.service';
import { LaundryService } from '../entities/laundry-service.entity';

@Controller('laundry-services')
export class LaundryServiceController {
    constructor(private readonly laundryServiceService: LaundryServiceService) {}

    @Post()
    async create(@Body() laundryService: Partial<LaundryService>): Promise<LaundryService> {
        return this.laundryServiceService.create(laundryService);
    }

    @Get()
    async findAll(): Promise<LaundryService[]> {
        return this.laundryServiceService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<LaundryService> {
        return this.laundryServiceService.findOne(id);
    }
    @Get('type/:type')
    async findByType(@Param('type') type: string): Promise<LaundryService[]> {
        return this.laundryServiceService.findByType(type);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() laundryService: Partial<LaundryService>,
    ): Promise<LaundryService> {
        return this.laundryServiceService.update(id, laundryService);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        return this.laundryServiceService.delete(id);
    }
}
