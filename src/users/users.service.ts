import { Injectable, NotFoundException } from '@nestjs/common';

import { AuthService } from 'src/auth/auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { UserToken } from './models/users.model';
import * as bcrypt from 'bcrypt';
import { UserDBService } from 'src/db/user/userDB.service';
import { User } from 'src/db/models/users.model';


@Injectable()
export class UsersService {
  constructor(
    private readonly acessDBUser: UserDBService,
    private readonly authService: AuthService,
  ) {}

  public async signup(signupDto: SignupDto): Promise<User> {
    return this.acessDBUser.created(signupDto);
  }

  public async signin(signinDto: SigninDto): Promise<UserToken> {
    const user = await this.acessDBUser.findByEmail(signinDto.email);
    const match = await this.checkPassword(signinDto.password, user);

    if (!match) {
      throw new NotFoundException('Invalid credentials.');
    } else {
      const jwtToken = await this.authService.createAccessToken(user._id);

      return {
        id: user._id,
        name: user.name,
        email: user.email,
        token: jwtToken,
      };
    }
  }

  private async checkPassword(password: string, user: User): Promise<boolean> {
    console.log(password);
    console.log(user.password);
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return true;
    } else {
      return false;
    }
  }
}
