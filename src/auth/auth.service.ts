import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { sign } from 'jsonwebtoken';
import { Request } from 'express';
import { JwtPayload } from './models/jwt-payload.model';
import { UserDBService } from 'src/db/user/userDB.service';
import { UserModel } from 'src/db/models/users.model';
import { SigninDto } from 'src/users/dto/signin.dto';
import { AuthenticateService } from 'src/firebase/authenticate/authenticate.service';
import { SignupDto } from 'src/users/dto/signup.dto';
import { ConfirmPasswordResetDto } from './dto/confirmPasswordReset.dto';
import { SendPasswordResetEmailDto } from './dto/sendPasswordResetEmail.dto';

@Injectable()
export class AuthService {
  constructor(private readonly acessDBUser: UserDBService, private readonly firebaseAuth: AuthenticateService) {}

  public async signup(signupDto: SignupDto): Promise<any> {
    const data = new Date();
    data.setSeconds(data.getSeconds() + +process.env.JWT_EXPIRATION);
    const createUserEmail = await this.firebaseAuth.createUserEmail(signupDto);

    if (!createUserEmail.data?.user.uid) {
      throw new BadRequestException(createUserEmail.error);
    } else {
      const user = await this.acessDBUser.created({
        email: signupDto.email,
        name: signupDto.name,
        uidAuth: createUserEmail.data.user.uid,
      });

      if (!user) {
        throw new NotFoundException('User not found');
      } else {
        const jwtToken = await this.createAccessToken(user._id);
        return {
          id: user._id,
          uidAuth: user.uidAuth,
          name: user.name,
          email: user.email,
          token: jwtToken,
          expire: data,
          emailVerified: createUserEmail.data.user.emailVerified,
        };
      }
    }
  }

  public async signin(signinDto: SigninDto): Promise<any> {
    const data = new Date();
    data.setSeconds(data.getSeconds() + +process.env.JWT_EXPIRATION);
    const verificPass = await this.firebaseAuth.verificationPassword(signinDto);

    if (!verificPass.data?.user.uid) {
      throw new BadRequestException(verificPass.error);
    } else {
      const user = await this.acessDBUser.findByEmail(signinDto.email);

      if (!user) {
        throw new NotFoundException('User not found');
      } else if (verificPass.data.user.uid === user.uidAuth) {
        const jwtToken = await this.createAccessToken(user._id);
        return {
          id: user._id,
          uidAuth: user.uidAuth,
          name: user.name,
          email: user.email,
          token: jwtToken,
          expire: data,
          emailVerified: verificPass.data.user.emailVerified,
        };
      } else {
        throw new BadRequestException('uid divergence');
      }
    }
  }

  public async sendEmailVerification(): Promise<void> {
    await this.firebaseAuth.sendEmailVerificationAuth();
  }

  public async sendPasswordResetEmail(sendPasswordResetEmailDto: SendPasswordResetEmailDto): Promise<void> {
    await this.firebaseAuth.sendPasswordResetEmailAuth(sendPasswordResetEmailDto.email);
  }

  public async confirmPasswordReset(confirmPasswordResetDto: ConfirmPasswordResetDto): Promise<void> {
    await this.firebaseAuth.confirmPasswordResetAuth(
      confirmPasswordResetDto.oobCode,
      confirmPasswordResetDto.newPassword,
    );
  }

  private async createAccessToken(userId: string): Promise<string> {
    return sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
  }

  public async validateUser(jwtPayload: JwtPayload): Promise<UserModel> {
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
