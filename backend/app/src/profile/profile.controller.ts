import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  UseGuards,
  Body,
  Req,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { DeleteDTO } from 'src/profile/dto/delete.dto';
import { RegisterDTO } from 'src/profile/dto/register.dto';
import { UpdateDTO } from 'src/profile/dto/update.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { RegisterResponse } from 'src/interface/register-res.interface';
import { ReportResponse } from 'src/interface/report-res.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { SelfUpdatefDTO } from './dto/selfUpdate.dto';

@ApiTags('Perfil de Usuário')
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly userService: ProfileService) {}

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
  //
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

  @Patch('self')
  @UseGuards(AuthGuard)
  async selfUpdate(
    @Body() reqData: SelfUpdatefDTO,
    @Req() request: Request,
  ): Promise<ReportResponse> {
    const response = await this.userService.updateUser(
      request.body.id,
      reqData?.username,
      reqData?.password,
      reqData?.email,
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
