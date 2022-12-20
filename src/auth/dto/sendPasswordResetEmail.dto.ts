import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendPasswordResetEmailDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
