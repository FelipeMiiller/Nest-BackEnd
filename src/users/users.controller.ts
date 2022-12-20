import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { UserDBService } from 'src/db/user/userDB.service';
import { UserModel } from 'src/db/models/users.model';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly acessDBUser: UserDBService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public async findAll(): Promise<UserModel[]> {
    return this.acessDBUser.findAll();
  }
}
