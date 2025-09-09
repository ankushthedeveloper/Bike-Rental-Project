import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../../db/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(user: User) {
    const payload = { userId: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
