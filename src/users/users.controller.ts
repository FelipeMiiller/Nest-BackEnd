import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { UserToken } from './models/users.model';
import { UsersService } from './users.service';
import { UserDBService } from 'src/db/user/userDB.service';
import { User } from 'src/db/models/users.model';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly acessDBUser: UserDBService,
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  public async signup(@Body() signup: SignupDto): Promise<User> {
    return this.usersService.signup(signup);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  public async signin(@Body() signin: SigninDto): Promise<UserToken> {
    return this.usersService.signin(signin);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public async findAll(): Promise<User[]> {
    return this.acessDBUser.findAll();
  }
}
