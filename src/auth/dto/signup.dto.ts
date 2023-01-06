import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class SignupDto {
  @ApiProperty({ description: 'nome completo do usuario' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'email do usuario' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'password com no minimo 4 caracteres' })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  password: string;

  @ApiProperty({ description: 'Name of Business' })
  @IsNotEmpty()
  @IsString()
  businessName: string;

  @ApiProperty({ description: 'CPF or CNPJ of Business' })
  @IsNotEmpty()
  @IsString()
  @Matches(/(^\d{11}$)|(^\d{14}$)/)
  businessDocument: string;
}
