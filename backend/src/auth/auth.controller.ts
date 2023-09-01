import { Controller, Get, Post, Query, Body, BadRequestException } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Get('login')
    async login(@Query()reqData: LoginDTO): Promise<LoginResponse> {
        // Verificando no Banco de dados se o usuário existe, se a senha está correta 
        const dbResponse = await this.authService.checkLogin(reqData.username, reqData.password)

        // Response com o Token
        return {
            ...dbResponse
        }
    }

    @Post('register')
    async register(@Body()reqData: RegisterDTO): Promise<RegisterResponse> {  
        await this.authService.registerUser(reqData.username, reqData.password, reqData.email)
        
        return {
            code: 200,
            message: 'something happened'
        }
    }
}
