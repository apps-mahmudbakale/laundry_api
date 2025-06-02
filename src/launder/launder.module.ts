import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Launder } from '../entities/launder.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Launder])],
    controllers: [],
    providers: [],
})
export class LaunderModule {}
