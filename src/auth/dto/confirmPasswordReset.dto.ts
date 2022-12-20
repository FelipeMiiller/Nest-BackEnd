import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ConfirmPasswordResetDto {
  @IsNotEmpty()
  @IsString()
  oobCode: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  newPassword: string;
}
