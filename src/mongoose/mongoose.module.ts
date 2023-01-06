import { Module } from '@nestjs/common';

import { UsersSchema } from './schemas/users.schema';
import { MongooseModule as MongooseNestJS } from '@nestjs/mongoose';
import { UserService } from './services/user/user.service';
import { PermissionsSchema } from './schemas/permissions.schema';
import { BusinessSchema } from './schemas/business.schema';
import { BusinessService } from './services/business/business.service';
import { PermissionService } from './services/permission/permission.service';

@Module({
  imports: [
    MongooseNestJS.forFeature([
      {
        name: 'User',
        schema: UsersSchema,
      },
      {
        name: 'Permission',
        schema: PermissionsSchema,
      },
      {
        name: 'Business',
        schema: BusinessSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [UserService, BusinessService, PermissionService],
  exports: [UserService, BusinessService, PermissionService],
})
export class MongooseModule {}
