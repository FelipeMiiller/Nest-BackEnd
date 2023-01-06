import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from 'src/mongoose/mongoose.module';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [AuthModule, MongooseModule, FirebaseModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
