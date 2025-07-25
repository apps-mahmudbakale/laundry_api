import { Body, Controller, Get, Post, Req, UseGuards, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { SignupDto } from './dto/signup.dto';
import { use } from 'passport';

@Controller('client')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Body() authPayload: AuthPayloadDto) {
    console.log(authPayload);
    return this.authService.validateUser(authPayload);
  }

  // Route for verifying OTP
  @Post('verify-otp')
  async verifyOtp(@Body('email') email: string, @Body('otp') otp: string,) {
    if (!email || !otp) {
      throw new BadRequestException('Email and OTP are required');
    }

    return this.authService.verifyOtp(email, otp);
  }

  // New endpoint for resending OTP
  @Post('resend-otp')
  async resendOtp(@Body('email') email: string) {
    return this.authService.resendOtp(email);
  }

  // New endpoint for sending OTP for forgot password
  @Post('send-forgot-password-otp')
  async sendForgotPasswordOtp(@Body('email') email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    // Call the service method to generate and send the OTP
    return this.authService.sendForgotPasswordOtp(email);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    // Manual validation
    if (!email || !email.includes('@')) {
      throw new BadRequestException('A valid email is required');
    }
    console.log(password);
    if (!password || password.length < 8) {
      throw new BadRequestException(
          'New password must be at least 8 characters',
      );
    }

    return this.authService.resetPassword(email, password);
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  async status(@Req() req: any) {
    // req.user contains the payload from the JWT (likely contains userId or email)
    const userId = req.user['id']; // Assuming your JWT contains the userId

    // Fetch the full user record from the database using the userId
    const user = await this.authService.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Return the full user record
    return user;
  }

  // NEW: Route to update user location
  @Post('location')
  @UseGuards(JwtAuthGuard) // Protect this route using JWT Guard
  async updateLocation(
    @Req() req: Request,
    @Body('latitude') latitude: number,
    @Body('longitude') longitude: number,
    @Body('address') address: string,
  ) {
    const userId = req.user['id'];

    if (!userId) {
      throw new UnauthorizedException('Invalid token');
    }

    // Call the service method to update location
    await this.authService.saveLocation(userId, latitude, longitude, address);

    return { message: 'Location updated successfully' };
  }
}
