import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SelfUpdatefDTO {
  @ApiProperty({
    description: 'Novo nome de usuário',
    example: 'nicolas_belchior ',
  })
  @IsString()
  username?: string;

  @ApiProperty({
    description: 'Nova senha',
    example: 'Password@1234',
  })
  @IsString()
  password?: string;

  @ApiProperty({
    description: 'Novo email',
    example: 'novoemail@email.com.br',
  })
  @IsEmail()
  email?: string;
}
