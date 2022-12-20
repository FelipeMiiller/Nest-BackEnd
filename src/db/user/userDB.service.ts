import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserModel } from '../models/users.model';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class UserDBService {
  constructor(
    @InjectModel('User')
    private readonly usersModel: Model<UserModel>,
  ) {}

  public async created(data: UserDto): Promise<any> {
    const user = await this.findByEmail(data.email);
    console.log(user);
    if (!user) {
      const userSave = new this.usersModel(data);

      return userSave.save();
    } else {
      throw new BadRequestException('Email already exists.');
    }
  }

  public async findAll(): Promise<UserModel[]> {
    const users = await this.usersModel.find();

    if (!users) {
      throw new NotFoundException('Users no found!');
    } else {
      return users;
    }
  }

  public async findID(id: string): Promise<UserModel> {
    const user = await this.usersModel.findOne({ _id: id });
    if (!user) {
      throw new UnauthorizedException('UserModel not found.');
    }
    return user;
  }

  public async findByEmail(email: string): Promise<any> {
    const user = await this.usersModel.findOne({ email });

    if (!user) {
      return false;
    } else {
      return user;
    }
  }
}
