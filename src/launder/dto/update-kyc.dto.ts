// dto/update-kyc.dto.ts
import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateKycDto {
    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        description: 'Business Registration Number',
        example: 'RC1234567',
    })
    business_reg_no?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        description: 'Business Address',
        example: '23 Some Street, City',
    })
    business_address?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        description: 'URL or path to the front side of the ID card',
        example: 'https://upload-url.com/id_front.jpg',
    })
    id_card_front?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        description: 'URL or path to the back side of the ID card',
        example: 'https://upload-url.com/id_back.jpg',
    })
    id_card_back?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        description: 'URL or path to the front side of the business certificate',
        example: 'https://upload-url.com/cert_front.jpg',
    })
    business_cert_front?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        description: 'URL or path to the back side of the business certificate',
        example: 'https://upload-url.com/cert_back.jpg',
    })
    business_cert_back?: string;
}
