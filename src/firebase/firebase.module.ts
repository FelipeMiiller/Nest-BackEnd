import { Module } from '@nestjs/common';
import { AuthenticateService } from './authenticate/authenticate.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AuthenticateService],
})
export class FirebaseModule {}
