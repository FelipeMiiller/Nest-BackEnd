import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from 'src/users/dto/signup.dto';
import { SigninDto } from 'src/users/dto/signin.dto';

import { AuthGuard } from '@nestjs/passport';
import { ConfirmPasswordResetDto } from './dto/confirmPasswordReset.dto';
import { SendPasswordResetEmailDto } from './dto/sendPasswordResetEmail.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  public async signup(@Body() signup: SignupDto): Promise<any> {
    return this.authService.signup(signup);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  public async signin(@Body() signin: SigninDto): Promise<any> {
    return this.authService.signin(signin);
  }

  @HttpCode(HttpStatus.OK)
  @Get('sendPasswordResetEmail')
  public async sendPasswordResetEmail(@Body() sendPasswordResetEmailDto: SendPasswordResetEmailDto): Promise<any> {
    return this.authService.sendPasswordResetEmail(sendPasswordResetEmailDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('confirmPasswordReset')
  public async confirmPasswordReset(@Body() confirmPasswordResetDto: ConfirmPasswordResetDto): Promise<any> {
    return this.authService.confirmPasswordReset(confirmPasswordResetDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Get('sendEmailVerification')
  public async ssendEmailVerification(): Promise<any> {
    return this.authService.sendEmailVerification();
  }
}
