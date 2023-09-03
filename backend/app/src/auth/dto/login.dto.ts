import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty({
    description: 'Nome de usuário',
    example: 'nicolas_belchior ',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Senha',
    example: 'Password@2023',
  })
  @IsString()
  password: string;
}
