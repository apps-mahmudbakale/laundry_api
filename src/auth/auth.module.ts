import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { LaunderAuthModule } from './launder-auth/launder-auth.module';
import {LaunderAuthService} from "./launder-auth/launder-auth.service";
import {LaunderAuthController} from "./launder-auth/launder-auth.controller";
import {Launder} from "../entities/launder.entity";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'abc123',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([User, Launder]),
    LaunderAuthModule,
  ],
  controllers: [AuthController, LaunderAuthController],
  providers: [AuthService, LaunderAuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
