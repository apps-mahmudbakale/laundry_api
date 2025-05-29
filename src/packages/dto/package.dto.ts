// src/packages/dto/package.dto.ts
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ServiceDto {
  @ApiProperty({ description: 'Service name', example: 'Dry Cleaning' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Icon representing the service', example: 'fa-tshirt' })
  @IsString()
  icon: string;
}

export class CreatePackageDto {
  @ApiProperty({ description: 'Package name', example: 'Standard Wash' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Price of the package', example: 1500 })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Number of washes included', example: 10 })
  @IsNotEmpty()
  @IsNumber()
  numberOfWashes: number;

  @ApiProperty({
    description: 'List of services included in the package',
    type: [ServiceDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceDto)
  services: ServiceDto[];
}
