import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [AuthModule, DbModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
