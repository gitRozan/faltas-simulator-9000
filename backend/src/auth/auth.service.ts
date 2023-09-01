import { BadRequestException, UnauthorizedException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { users } from '@prisma/client';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService
    ){}
    
    async checkLogin(username: string, password: string): Promise<LoginResponse> {
        const user = await this.prismaService.users.findFirst({
            where: {
                username
            }
        })
        
        if(user && await bcrypt.compare(password, user.password)) {
            const token = this.createToken(user)
            
            return {
                code: 200,
                message: 'ok',
                user_id: user.id,
                token
            }
        }
        else {
            throw new UnauthorizedException('Usuário e/ou senha incorretos')
        }
    }

    async registerUser(username: string, password: string, email: string) {
        if (await this.prismaService.users.findFirst({where : {email}}) || await this.prismaService.users.findFirst({where : {username}})) {
            throw new BadRequestException('Credencias já cadastradas.')
        }
        const encryptedPassword = await bcrypt.hash(password, await bcrypt.genSalt())
        await this.prismaService.users.create({
            data: {
                username,
                password: encryptedPassword,
                email
            }
        })

        return {
            code: 200,
            message: 'Usuário criado'
        }
    }

    // Funções JWT
    createToken(user: users) {
        return this.jwtService.sign({
            id : user.id,
            username : user.username,
            email : user.email
          },{
            audience : 'user',
            expiresIn : '1h',
            issuer : 'login',
            subject : `${user.id}`
          })
    }
    
    checkToken(token: string) {
        const data = this.jwtService.verify(token, {
            audience: 'user',
            issuer: 'login'
        })

        return data
    }
}
