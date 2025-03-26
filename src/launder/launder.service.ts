import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm'; // Import DeleteResult
import { Launder } from '../entities/launder.entity';
import { CreateLaunderDTO } from './dto/create-launder.dto';
import { UpdateLaunderDTO } from './dto/update-launder.dto';

@Injectable()
export class LaunderService {
    constructor(
        @InjectRepository(Launder)
        private readonly launderRepository: Repository<Launder>,
    ) {}

    async create(createLaunderDto: CreateLaunderDTO): Promise<Launder> {
        try {
            console.log('Incoming DTO:', createLaunderDto);

            const launder = this.launderRepository.create({
                name: createLaunderDto.name,
                email: createLaunderDto.email,
                phone: createLaunderDto.phone,
                password: createLaunderDto.password,
                state: createLaunderDto.state,
                address: createLaunderDto.address,
                ninOrBvn: createLaunderDto.ninOrBvn,
                bankName: createLaunderDto.bankName,
                accountNumber: createLaunderDto.accountNumber,
            });

            console.log('Entity before save:', launder);

            return await this.launderRepository.save(launder);
        } catch (error) {
            throw new BadRequestException(`Failed to create launder: ${error.message}`);
        }
    }

    async findAll(): Promise<Launder[]> {
        return await this.launderRepository.find();
    }

    async findOne(id: number): Promise<Launder | null> {
        return await this.launderRepository.findOne({ where: { id } });
    }

    async update(id: number, updateLaunderDto: UpdateLaunderDTO): Promise<Launder | null> {
        const launder = await this.findOne(id);
        if (!launder) {
            return null;
        }

        await this.launderRepository.update(id, updateLaunderDto);
        return this.findOne(id);
    }

    async delete(id: number): Promise<{ deleted: boolean }> {
        const result: DeleteResult = await this.launderRepository.delete(id);
        return { deleted: result.affected > 0 }; // Use affected from DeleteResult
    }
}