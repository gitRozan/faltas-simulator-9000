import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDTO {
  @ApiProperty({
    description: 'Nome de usuário',
    example: 'nicolas_belchior',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Senha',
    example: 'Password@2023',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Email',
    example: 'Nicolas Belchior',
  })
  @IsEmail()
  email: string;

  @IsString()
  role?: string;
}
