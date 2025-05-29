import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLocationDto {
    @ApiProperty({ description: 'Latitude coordinate', example: '40.712776' })
    @IsNotEmpty()
    lat: string;

    @ApiProperty({ description: 'Longitude coordinate', example: '-74.005974' })
    @IsNotEmpty()
    long: string;

    @ApiProperty({ description: 'Physical address', example: '123 Main St, New York, NY' })
    @IsNotEmpty()
    address: string;
}
