import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
    @ApiProperty({ description: 'User email address', example: 'user@example.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'New password (minimum 6 characters)', example: 'newStrongPass123' })
    @MinLength(6)
    @IsNotEmpty()
    newPassword: string;
}
