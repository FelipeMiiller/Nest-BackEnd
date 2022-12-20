import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase.service';
import { SignupDto } from 'src/users/dto/signup.dto';
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
import { AuthRespDto } from '../dto/authResp.dto';
import { EmailPassDto } from '../dto/emailPassword.dto';

@Injectable()
export class AuthenticateService {
  constructor(private readonly firebaseService: FirebaseService) {}

  auth: Auth = getAuth(this.firebaseService.appFireBase);

  public async createUserEmail(signupDto: SignupDto): Promise<AuthRespDto> {
    let data: AuthRespDto;

    await createUserWithEmailAndPassword(this.auth, signupDto.email, signupDto.password)
      .then((userCredential) => {
        data = { data: userCredential };
        sendEmailVerification(userCredential.user);
      })
      .catch((error: { code: string }) => {
        data = { error: error.code };
      });

    return data;
  }

  public async verificationPassword(emailPassDto: EmailPassDto): Promise<AuthRespDto> {
    let data: AuthRespDto;

    await signInWithEmailAndPassword(this.auth, emailPassDto.email, emailPassDto.password)
      .then((userCredential: UserCredential) => {
        data = { data: userCredential };
      })
      .catch((error: { code: string }) => {
        data = { error: error.code };
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
