import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    try {
      const data = this.authService.checkToken(
        (authorization ?? '').split(' ')[1],
      );
      request.userRole = (await this.userService.getById(data.id)).role;

      return true;
    } catch (e) {
      return false;
    }
  }
}
