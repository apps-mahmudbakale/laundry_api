import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Launder } from '../entities/launder.entity';
import { LaunderService } from './launder.service';
import { LaunderController } from './launder.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Launder])],
    controllers: [LaunderController],
    providers: [LaunderService],
})
export class LaunderModule {}
