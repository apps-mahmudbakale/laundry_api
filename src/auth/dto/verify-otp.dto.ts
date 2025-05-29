import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpDto {
    @ApiProperty({ description: 'User email address', example: 'user@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'One-time password sent to email', example: '123456' })
    @IsNotEmpty()
    otp: string;
}
