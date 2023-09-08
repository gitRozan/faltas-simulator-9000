import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ProfileService } from '../profile/profile.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly profileService: ProfileService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    try {
      const data = this.authService.checkToken(
        (authorization ?? '').split(' ')[1],
      );
      request.body.userRole = (await this.profileService.getById(data.id)).role;
      request.body.id = data.id;

      return true;
    } catch (e) {
      return false;
    }
  }
}
