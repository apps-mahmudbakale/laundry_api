// src/modules/auth/dto/update-profile.dto.ts
import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    fullName?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    avatar?: string;
}
