import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDTO {
  @ApiProperty({
    description: 'Novo nome de usuário',
    example: 'nicolas_belchior ',
  })
  @IsString()
  username?: string;

  @ApiProperty({
    description: 'Nova senha',
    example: 'Password@2023',
  })
  @IsString()
  password?: string;

  @ApiProperty({
    description: 'Novo email',
    example: 'Nicolas Belchior ',
  })
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'Novo Cargo / Permissão',
    example: 'admin',
  })
  @IsString()
  role?: string;

  @ApiProperty({
    description: 'Id do usuário',
    example: 1,
  })
  @IsString()
  id: number;
}
