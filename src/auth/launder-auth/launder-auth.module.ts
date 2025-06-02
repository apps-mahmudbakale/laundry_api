// launder-auth.module.ts
import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {LaunderAuthService} from './launder-auth.service';
import {LaunderAuthController} from './launder-auth.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Launder} from "../../entities/launder.entity";
import {Order} from "../../entities/order.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Launder, Order]),
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'defaultSecret',
            signOptions: {expiresIn: '1d'},
        }),
    ],
    controllers: [LaunderAuthController],
    providers: [LaunderAuthService],
})
export class LaunderAuthModule {
}
