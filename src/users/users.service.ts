import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AuthenticateService } from 'src/firebase/authenticate/authenticate.service';
import { UserService } from 'src/mongoose/services/user/user.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly acessDBUser: UserService,
    private readonly authService: AuthService,
    private readonly firebaseAuth: AuthenticateService,
  ) {}
}
