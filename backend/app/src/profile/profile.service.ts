import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { users } from '@prisma/client';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  async getById(id: number) {
    const userData = await this.prismaService.users.findFirst({
      where: {
        id,
      },
    });
    return userData;
  }

  async registerUser(
    username: string,
    password: string,
    email: string,
    role?: string,
  ) {
    if (
      (await this.prismaService.users.findFirst({ where: { email } })) ||
      (await this.prismaService.users.findFirst({ where: { username } }))
    ) {
      throw new BadRequestException('Credencias já cadastradas.');
    }
    const encryptedPassword = await bcrypt.hash(
      password,
      await bcrypt.genSalt(),
    );
    await this.prismaService.users.create({
      data: {
        username,
        password: encryptedPassword,
        email,
        role: role ? role : 'user',
      },
    });

    return {
      code: 200,
      message: 'Usuário criado',
    };
  }

  async deleteUser(id: number): Promise<users> {
    const user = await this.prismaService.users.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new BadRequestException('Usuário não encontrado.');
    } else {
      const response = await this.prismaService.users.delete({
        where: {
          id,
        },
      });
      return response;
    }
  }

  async updateUser(
    id: number,
    username?: string,
    password?: string,
    email?: string,
    role?: string,
  ): Promise<users> {
    const user = await this.prismaService.users.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new BadRequestException('Usuário não encontrado.');
    } else {
      const encryptedPassword = password
        ? await bcrypt.hash(password, await bcrypt.genSalt())
        : user.password;
      const updatedUser = await this.prismaService.users.update({
        where: {
          id,
        },
        data: {
          username: username ? username : user.username,
          password: encryptedPassword,
          email: email ? email : user.email,
          role: role ? role : user.role,
        },
      });

      return updatedUser;
    }
  }
}
