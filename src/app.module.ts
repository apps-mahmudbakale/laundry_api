import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule} from './auth/auth.module';
import {User} from './entities/user.entity';
import {LaunderModule} from './launder/launder.module'


import * as dotenv from 'dotenv';
import {Launder} from "./entities/launder.entity";
import {LaundryServiceModule} from "./laundry_service/laundry-service.module";
import {LaundryService} from "./entities/laundry-service.entity";
import {Package} from "./entities/package.entity";
import {Payment} from "./entities/payment.entity";
import {Subscription} from "./entities/subscription.entity";
import {Service} from "./entities/service.entity";
import {OrdersModule} from './orders/orders.module';
import {LaunderAuthModule} from "./auth/launder-auth/launder-auth.module";

// Load environment variables from .env file
dotenv.config();

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [User, Launder, LaundryService, Package, Payment, Subscription, Service],
            synchronize: true,
            ssl: process.env.DB_SSL === 'true' ? {rejectUnauthorized: false} : false,
        }),
        AuthModule,
        LaunderAuthModule,
        LaunderModule,
        LaundryServiceModule,
        OrdersModule,
    ],
})
export class AppModule {
}
