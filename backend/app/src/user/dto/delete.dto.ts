import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteDTO {
  @ApiProperty({
    description: 'Id do usuário',
    example: '32',
  })
  @IsNumber()
  id: number;
}
