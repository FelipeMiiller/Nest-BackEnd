import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { UserModel } from 'src/mongoose/models/users.model';
import { UserService } from 'src/mongoose/services/user/user.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly acessDBUser: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public async findAll(): Promise<UserModel[]> {
    return this.acessDBUser.findAll();
  }
}
