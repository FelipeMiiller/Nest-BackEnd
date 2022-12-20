import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { UserDBService } from 'src/db/user/userDB.service';
import { AuthenticateService } from 'src/firebase/authenticate/authenticate.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly acessDBUser: UserDBService,
    private readonly authService: AuthService,
    private readonly firebaseAuth: AuthenticateService,
  ) {}
}
