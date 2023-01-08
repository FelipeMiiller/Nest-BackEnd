import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase.service';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  sendPasswordResetEmail,
  confirmPasswordReset,
  sendEmailVerification,
  applyActionCode,
  Auth,
} from 'firebase/auth';
import { AuthUserRespDto } from '../dto/authResp.dto';
import { EmailPassDto } from '../dto/emailPassword.dto';
import { UserAuthDto } from 'src/auth/dto/userAuth.dto';

@Injectable()
export class AuthenticateService {
  constructor(private readonly firebaseService: FirebaseService) {}

  auth: Auth = getAuth(this.firebaseService.appFireBase);

  public async createEmail(userAuthDto: UserAuthDto): Promise<AuthUserRespDto> {
    let data: AuthUserRespDto;
    let error: string;
    await createUserWithEmailAndPassword(this.auth, userAuthDto.email, userAuthDto.password)
      .then((userCredential: AuthUserRespDto) => {
        sendEmailVerification(userCredential.user);
        data = userCredential;
      })
      .catch((e: { code: string }) => {
        console.log(e.code);
        error = e.code;
      });

    if (!data) {
      throw new Error(error);
    } else {
      return data;
    }
  }

  public async verificationPassword(emailPassDto: EmailPassDto): Promise<any> {
    let data: AuthUserRespDto;

    await signInWithEmailAndPassword(this.auth, emailPassDto.email, emailPassDto.password)
      .then((userCredential: UserCredential) => {
        data = userCredential;
      })
      .catch((error: { code: string }) => {
        throw new Error(error.code);
      });

    return data;
  }

  public async sendEmailVerificationAuth(): Promise<void> {
    await sendEmailVerification(this.auth.currentUser);
  }

  public async applyActionCodeAuth(code: string): Promise<void> {
    await applyActionCode(this.auth, code);
  }

  public async sendPasswordResetEmailAuth(email: string): Promise<void> {
    await sendPasswordResetEmail(this.auth, email);
  }

  public async confirmPasswordResetAuth(oobCode: string, newPassword: string): Promise<void> {
    await confirmPasswordReset(this.auth, oobCode, newPassword);
  }
}
