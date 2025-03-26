import { Controller, Post, Body, Get, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { LaunderService } from './launder.service';
import { CreateLaunderDTO } from './dto/create-launder.dto';
import { UpdateLaunderDTO } from './dto/update-launder.dto';
import { Launder } from '../entities/launder.entity';

@Controller('launders')
export class LaunderController {
    constructor(private readonly launderService: LaunderService) {}

    @Post('create')
    async create(@Body() createLaunderDto: CreateLaunderDTO): Promise<Launder> {
        return await this.launderService.create(createLaunderDto);
    }

    @Get()
    async findAll(): Promise<Launder[]> {
        return await this.launderService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Launder | null> {
        return await this.launderService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateLaunderDto: UpdateLaunderDTO,
    ): Promise<Launder | null> {
        return await this.launderService.update(id, updateLaunderDto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<{ deleted: boolean }> {
        return await this.launderService.delete(id);
    }
}