import {Controller, Post, Body, Get, Param, Put, Delete, ParseIntPipe, UseGuards, Patch, Req} from '@nestjs/common';
import { LaunderService } from './launder.service';
import { CreateLaunderDTO } from './dto/create-launder.dto';
import { UpdateLaunderDTO } from './dto/update-launder.dto';
import { Launder } from '../entities/launder.entity';
import {AuthGuard} from "@nestjs/passport";
import {UpdateKycDto} from "./dto/update-kyc.dto";
import {ApiBody, ApiResponse} from "@nestjs/swagger";

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

    // launder.controller.ts
    @UseGuards(AuthGuard('jwt'))
    @Patch('kyc')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiBody({
        type: UpdateKycDto,
        description: 'Json structsure for launder object.',
    })
    async updateKyc(@Req() req, @Body() dto: UpdateKycDto) {
        return this.launderService.updateKyc(req.user.id, dto);
    }


    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<{ deleted: boolean }> {
        return await this.launderService.delete(id);
    }
}