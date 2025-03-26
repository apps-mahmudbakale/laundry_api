import { IsString, IsNotEmpty, IsEmail, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

// Assuming ServicePricing might be stored separately in the future
class ServicePricingDTO {
    @IsString()
    @IsNotEmpty()
    serviceName: string;

    @IsNotEmpty()
    price: number;
}

export class CreateLaunderDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    state: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    ninOrBvn: string;

    @IsString()
    @IsNotEmpty()
    bankName: string;

    @IsString()
    @IsNotEmpty()
    accountNumber: string;

    // Optional: Remove if not needed in this entity
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ServicePricingDTO)
    servicePricings?: ServicePricingDTO[];
}

export class UpdateLaunderDTO {
    @IsString()
    @IsNotEmpty()
    name?: string;

    @IsEmail()
    email?: string;

    @IsString()
    phone?: string;

    @IsString()
    password?: string;

    @IsString()
    state?: string;

    @IsString()
    address?: string;

    @IsString()
    ninOrBvn?: string;

    @IsString()
    bankName?: string;

    @IsString()
    accountNumber?: string;
}