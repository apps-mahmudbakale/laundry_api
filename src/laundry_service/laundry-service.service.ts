import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LaundryService } from '../entities/laundry-service.entity';

@Injectable()
export class LaundryServiceService {
    constructor(
        @InjectRepository(LaundryService)
        private readonly laundryServiceRepository: Repository<LaundryService>,
    ) {}

    async create(laundryService: Partial<LaundryService>): Promise<LaundryService> {
        const newService = this.laundryServiceRepository.create(laundryService);
        return this.laundryServiceRepository.save(newService);
    }

    async findAll(): Promise<LaundryService[]> {
        return this.laundryServiceRepository.find();
    }

    async findOne(id: number): Promise<LaundryService> {
        return this.laundryServiceRepository.findOne({ where: { id } });
    }

    async findByType(type: string): Promise<LaundryService[]> {
        return this.laundryServiceRepository.find({ where: { type } });
    }

    async update(id: number, laundryService: Partial<LaundryService>): Promise<LaundryService> {
        await this.laundryServiceRepository.update(id, laundryService);
        return this.findOne(id);
    }

    async delete(id: number): Promise<void> {
        await this.laundryServiceRepository.delete(id);
    }
}
