import { UnauthorizedException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { users } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { LoginResponse } from 'src/interface/login-res.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async checkLogin(username: string, password: string): Promise<LoginResponse> {
    const user = await this.prismaService.users.findFirst({
      where: {
        username,
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = this.createToken(user);

      return {
        code: 200,
        message: 'ok',
        user_id: user.id,
        token,
      };
    } else {
      throw new UnauthorizedException('Usuário e/ou senha incorretos');
    }
  }

  // Funções JWT
  createToken(user: users) {
    return this.jwtService.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      {
        audience: 'user',
        expiresIn: '1h',
        issuer: 'login',
        subject: `${user.id}`,
      },
    );
  }

  checkToken(token: string) {
    const data = this.jwtService.verify(token, {
      audience: 'user',
      issuer: 'login',
    });

    return data;
  }
}
