import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { PermissionDto } from 'src/mongoose/dto/permission.dto';
import { PermissionModel } from 'src/mongoose/models/permissions.model';
import { PermissionsSchema } from 'src/mongoose/schemas/permissions.schema';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel('Permission')
    private readonly permissionModel: Model<PermissionModel>,
  ) {}

  public async created(permissionDto: PermissionDto): Promise<PermissionModel> {
    const permissionSave = await this.findOne({ user: permissionDto.user, business: permissionDto.business });

    if (!permissionSave) {
      const permissionSave = new this.permissionModel(permissionDto);

      return permissionSave.save();
    } else {
      throw new Error('Permission already exists.');
    }
  }

  public async findById(id: string): Promise<any> {
    const business = await this.permissionModel.findById({ id });

    if (!business) {
      return false;
    } else {
      return business;
    }
  }

  public async populateByIdUserEmail(email: string): Promise<any> {
    const permissionsUser = await this.permissionModel
      .find()
      .populate({
        path: 'user',
        match: { email: { $gte: email } },
      })
      .populate('business');
    console.log(permissionsUser);
    if (!permissionsUser.length) {
      throw new Error('Permission not found');
    } else {
      return permissionsUser;
    }
  }

  public async populateByIdBusinessDocument(document: string): Promise<any> {
    const permissionsUser = await this.permissionModel
      .find()
      .populate({
        path: 'business',
        match: { document: { $gte: document } },
      })
      .populate('user');
    console.log(permissionsUser);
    if (!permissionsUser.length) {
      throw new Error('Permission not found');
    } else {
      return permissionsUser;
    }
  }

  public async find(data: any): Promise<any> {
    const permission = await this.permissionModel.find({ ...data });

    if (!permission) {
      return false;
    } else {
      return permission;
    }
  }
  public async findOne(data: any): Promise<any> {
    const permission = await this.permissionModel.findOne({ ...data });

    if (!permission) {
      return false;
    } else {
      return permission;
    }
  }
}
