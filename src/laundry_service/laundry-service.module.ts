import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LaundryService } from '../entities/laundry-service.entity';
import { LaundryServiceService } from './laundry-service.service';
import { LaundryServiceController } from './laundry-service.controller';

@Module({
    imports: [TypeOrmModule.forFeature([LaundryService])],
    controllers: [LaundryServiceController],
    providers: [LaundryServiceService],
})
export class LaundryServiceModule {}
