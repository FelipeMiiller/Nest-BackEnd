import { BadRequestException, Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { Request } from 'express';
import { JwtPayload } from './models/jwt-payload.model';
import { AuthenticateService } from 'src/firebase/authenticate/authenticate.service';
import { ConfirmPasswordResetDto } from './dto/confirmPasswordReset.dto';
import { SendPasswordResetEmailDto } from './dto/sendPasswordResetEmail.dto';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { UserService } from 'src/mongoose/services/user/user.service';
import { BusinessService as BusinessDB } from 'src/mongoose/services/business/business.service';
import { PermissionService as PermissionDB } from 'src/mongoose/services/permission/permission.service';
import { UserModel } from 'src/mongoose/models/users.model';
import { UserAuthDto } from './dto/userAuth.dto';
import console from 'console';

@Injectable()
export class AuthService {
  constructor(
    private readonly firebaseAuth: AuthenticateService,
    private readonly userDB: UserService,
    private readonly bussinessDB: BusinessDB,
    private readonly permissionDB: PermissionDB,
  ) {}

  public async signup(signupDto: SignupDto): Promise<any> {
    try {
      const user = await this.createUserAuth(signupDto);
      const business = await this.bussinessDB.created({
        document: signupDto.businessDocument,
        name: signupDto.businessName,
        status: true,
      });

      const permission = await this.permissionDB.created({
        user: user._id,
        business: business._id,
        status: true,
        type: 'admin',
      });
      if (permission) {
        return permission;
      }
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }

  public async signin(signinDto: SigninDto): Promise<any> {
    try {
      const data = new Date();
      data.setSeconds(data.getSeconds() + +process.env.JWT_EXPIRATION);

      return this.permissionDB.populateByIdUserEmail(signinDto.email);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  private async createUserAuth(userAuthDto: UserAuthDto): Promise<any> {
    try {
      const data = new Date();
      data.setSeconds(data.getSeconds() + +process.env.JWT_EXPIRATION);
      const authCreated = await this.firebaseAuth.createEmail(userAuthDto);
      const userCreate = await this.userDB.created({
        email: userAuthDto.email,
        name: userAuthDto.name,
        uidAuth: authCreated.user.uid,
        status: true,
      });

      return userCreate;
    } catch (e) {
      throw new Error(e);
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
    return this.userDB.findID(jwtPayload.userId);
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
