import { Controller, Get, Query } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';
import { LoginResponse } from 'src/interface/login-res.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  async login(@Query() reqData: LoginDTO): Promise<LoginResponse> {
    // Verificando no Banco de dados se o usuário existe, se a senha está correta
    const dbResponse = await this.authService.checkLogin(
      reqData.username,
      reqData.password,
    );

    // Response com o Token
    return {
      ...dbResponse,
    };
  }
}
