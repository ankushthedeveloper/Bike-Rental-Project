import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../api/services/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const userToken = req.cookies?.authToken;
    if (!userToken) {
      throw new UnauthorizedException('No auth token found');
    }
    try {
      const decoded = jwt.verify(userToken, process.env.JWT_SECRET!);
      const userId = (decoded as any).userId;
      const currentUser = await this.userService.findOne(Number(userId));
      if (!currentUser || currentUser.authToken !== userToken) {
        throw new UnauthorizedException('Invalid auth token');
      }
      req.user = currentUser;
      return true;
    } catch (error) {
      console.error('AuthGuard error:', error);
      throw new UnauthorizedException('Invalid auth token');
    }
  }
}
