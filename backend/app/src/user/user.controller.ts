import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  UseGuards,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { DeleteDTO } from 'src/user/dto/delete.dto';
import { RegisterDTO } from 'src/user/dto/register.dto';
import { UpdateDTO } from 'src/user/dto/update.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { RegisterResponse } from 'src/interface/register-res.interface';
import { ReportResponse } from 'src/interface/report-res.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getUser(@Param() reqData: any) {
    return this.userService.getById(reqData?.id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @Roles('admin')
  async register(@Body() reqData: RegisterDTO): Promise<RegisterResponse> {
    await this.userService.registerUser(
      reqData.username,
      reqData.password,
      reqData.email,
      reqData?.role,
    );

    return {
      code: 200,
      message: 'something happened',
    };
  }

  @Patch()
  @UseGuards(AuthGuard)
  @Roles('admin')
  async update(@Body() reqData: UpdateDTO): Promise<ReportResponse> {
    const response = await this.userService.updateUser(
      reqData.id,
      reqData?.username,
      reqData?.password,
      reqData?.email,
      reqData?.role,
    );
    return {
      code: 200,
      message: `Usuário Atualizado`,
      id: response.id,
      username: response.username,
    };
  }

  @Delete()
  @UseGuards(AuthGuard)
  @Roles('admin')
  async delete(@Body() reqData: DeleteDTO): Promise<ReportResponse> {
    const response = await this.userService.deleteUser(reqData.id);
    return {
      code: 200,
      message: `Usuário removido`,
      id: response.id,
      username: response.username,
    };
  }
}
