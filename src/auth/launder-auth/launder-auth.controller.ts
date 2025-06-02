import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Req,
    UseGuards, Query,
} from '@nestjs/common';
import { LaunderAuthService } from './launder-auth.service';
import { CreateLaunderDTO } from '../../launder/dto/create-launder.dto';
import { AuthPayloadDto } from '../dto/auth.dto';
import { VerifyOtpDto } from '../dto/verify-otp.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto'; // Make sure this DTO exists
import { JwtAuthGuard } from '../guards/jwt.guard';

@Controller('provider')
export class LaunderAuthController {
    constructor(private readonly launderAuthService: LaunderAuthService) {}

    @Post('register')
    register(@Body() dto: CreateLaunderDTO): Promise<any> {
        return this.launderAuthService.register(dto);
    }

    @Post('resend-otp')
    resendOtp(@Body('email') email: string) {
        return this.launderAuthService.resendOtp(email);
    }

    @Post('verify')
    verifyOtp(@Body() dto: VerifyOtpDto) {
        return this.launderAuthService.verifyOtp(dto.email, dto.otp);
    }

    @Post('login')
    login(@Body() dto: AuthPayloadDto) {
        return this.launderAuthService.login(dto);
    }

    @Post('forgot-password')
    forgotPassword(@Body('email') email: string) {
        return this.launderAuthService.sendForgotPasswordOtp(email);
    }

    @Post('reset-password')
    resetPassword(@Body() dto: ResetPasswordDto) {
        return this.launderAuthService.resetPassword(dto.email, dto.newPassword);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('update-location')
    updateLocation(@Req() req, @Body() dto: UpdateLocationDto) {
        return this.launderAuthService.updateLocation(req.user.id, dto.lat, dto.long, dto.address);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('profile')
    updateProfile(@Req() req, @Body() dto: UpdateProfileDto) {
        return this.launderAuthService.updateProfile(req.user.id, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() req) {
        return this.launderAuthService.getProfile(req.user.id);
    }
    @UseGuards(JwtAuthGuard)
    @Get('orders')
    getOrders(@Req() req, @Query('status') status?: string) {
        return this.launderAuthService.getOrders(req.user.id, status);
    }

    @UseGuards(JwtAuthGuard)
    @Get('orders/:orderId')
    getOrderById(@Req() req, @Param('orderId') orderId: string) {
        return this.launderAuthService.getOrderById(req.user.id, orderId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('orders/:orderId/accept')
    acceptOrder(@Req() req, @Param('orderId') orderId: string) {
        return this.launderAuthService.acceptOrder(req.user.id, orderId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('orders/:orderId/decline')
    declineOrder(@Req() req, @Param('orderId') orderId: string) {
        return this.launderAuthService.declineOrder(req.user.id, orderId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('orders/:orderId/complete')
    completeOrder(@Req() req, @Param('orderId') orderId: string) {
        return this.launderAuthService.completeOrder(req.user.id, orderId);
    }
}
