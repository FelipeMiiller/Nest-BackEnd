import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/users.model';
import { SignupDto } from 'src/users/dto/signup.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class UserDBService {
  constructor(
    @InjectModel('User')
    private readonly usersModel: Model<User>,
  ) {}

  public async created(signupDto: SignupDto): Promise<User> {
    const user = await this.findByEmail(signupDto.email);

    if (!user) {
      const userSave = new this.usersModel(signupDto);

      return userSave.save();
    } else {
      throw new BadRequestException('Email already exists.');
    }
  }

  public async findAll(): Promise<User[]> {
    const users = await this.usersModel.find();

    if (!users) {
      throw new NotFoundException('Users no found!');
    } else {
      return users;
    }
  }

  public async findID(id: string): Promise<User> {
    const user = await this.usersModel.findOne({ _id: id });
    if (!user) {
      throw new UnauthorizedException('User not found.');
    }
    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.usersModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('Email not found');
    } else {
      return user;
    }
  }
}
