import { BadRequestException, Injectable } from '@nestjs/common';

import { sign } from 'jsonwebtoken';
import { Request } from 'express';
import { JwtPayload } from './models/jwt-payload.model';
import { UserDBService } from 'src/db/user/userDB.service';
import { User } from 'src/db/models/users.model';

@Injectable()
export class AuthService {
  constructor(private readonly acessDBUser: UserDBService) {}

  public async createAccessToken(userId: string): Promise<string> {
    return sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
  }

  public async validateUser(jwtPayload: JwtPayload): Promise<User> {
    return this.acessDBUser.findID(jwtPayload.userId);
  }

  private static jwtExtractor(request: Request): string {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new BadRequestException('Bad request.');
    }

    const [, token] = authHeader.split(' ');

    return token;
  }

  public returnJwtExtractor(): (request: Request) => string {
    return AuthService.jwtExtractor;
  }
}
