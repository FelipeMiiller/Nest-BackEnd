import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendPasswordResetEmailDto {
  @ApiProperty({ description: 'email do usuario' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
