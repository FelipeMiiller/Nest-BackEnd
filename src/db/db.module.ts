import { Module } from '@nestjs/common';

import { UsersSchema } from './schemas/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDBService } from './user/userDB.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UsersSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [UserDBService],
  exports: [UserDBService],
})
export class DbModule {}
