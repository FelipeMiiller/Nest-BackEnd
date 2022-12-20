import { Module } from '@nestjs/common';

import { FirebaseService } from './firebase.service';
import { AuthenticateService } from './authenticate/authenticate.service';

@Module({
  imports: [],
  controllers: [],
  providers: [FirebaseService, AuthenticateService],
  exports: [AuthenticateService],
})
export class FirebaseModule {}
