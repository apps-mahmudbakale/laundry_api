import { ApiProperty } from '@nestjs/swagger';

export class AuthPayloadDto {
    @ApiProperty({ example: 'user@example.com', description: 'User email address' })
    email: string;

    @ApiProperty({ example: 'strongPassword123', description: 'User password' })
    password: string;
}
