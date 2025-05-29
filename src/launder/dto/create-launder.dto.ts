import { IsString, IsNotEmpty, IsEmail, IsArray, ValidateNested, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class ServicePricingDTO {
    @ApiProperty({ description: 'Name of the service', example: 'Dry Cleaning' })
    @IsString()
    @IsNotEmpty()
    serviceName: string;

    @ApiProperty({ description: 'Price of the service', example: 500 })
    @IsNumber()
    @IsNotEmpty()
    price: number;
}

export class CreateLaunderDTO {
    @ApiProperty({ description: 'Full name of launderer', example: 'John Doe' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Business name', example: 'CleanWash Ltd.' })
    @IsString()
    @IsNotEmpty()
    businessName: string;

    @ApiProperty({ description: 'Email address', example: 'john@example.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'Phone number', example: '+2348012345678' })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({ description: 'Password', example: 'StrongPass123!' })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ description: 'State of operation', example: 'Lagos' })
    @IsString()
    @IsNotEmpty()
    state: string;

    @ApiProperty({ description: 'Business address', example: '123 Business St, Lagos' })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({ description: 'National Identification Number or BVN', example: '12345678901' })
    @IsString()
    @IsNotEmpty()
    ninOrBvn: string;

    @ApiProperty({ description: 'Bank name', example: 'First Bank' })
    @IsString()
    @IsNotEmpty()
    bankName: string;

    @ApiProperty({ description: 'Bank account number', example: '1234567890' })
    @IsString()
    @IsNotEmpty()
    accountNumber: string;

    @ApiPropertyOptional({
        description: 'List of service pricings',
        type: [ServicePricingDTO]
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ServicePricingDTO)
    servicePricings?: ServicePricingDTO[];
}

export class UpdateLaunderDTO {
    @ApiPropertyOptional({ description: 'Full name of launderer', example: 'John Doe' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({ description: 'Business name', example: 'CleanWash Ltd.' })
    @IsOptional()
    @IsString()
    businessName?: string;

    @ApiPropertyOptional({ description: 'Email address', example: 'john@example.com' })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional({ description: 'Phone number', example: '+2348012345678' })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiPropertyOptional({ description: 'Password', example: 'NewStrongPass123!' })
    @IsOptional()
    @IsString()
    password?: string;

    @ApiPropertyOptional({ description: 'State of operation', example: 'Lagos' })
    @IsOptional()
    @IsString()
    state?: string;

    @ApiPropertyOptional({ description: 'Business address', example: '123 Business St, Lagos' })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiPropertyOptional({ description: 'National Identification Number or BVN', example: '12345678901' })
    @IsOptional()
    @IsString()
    ninOrBvn?: string;

    @ApiPropertyOptional({ description: 'Bank name', example: 'First Bank' })
    @IsOptional()
    @IsString()
    bankName?: string;

    @ApiPropertyOptional({ description: 'Bank account number', example: '1234567890' })
    @IsOptional()
    @IsString()
    accountNumber?: string;
}
