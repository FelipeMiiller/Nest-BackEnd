import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { SendPasswordResetEmailDto } from './dto/sendPasswordResetEmail.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@ApiTags('auth')
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

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Post('sendPasswordResetEmail')
  public async sendPasswordResetEmail(@Body() sendPasswordResetEmailDto: SendPasswordResetEmailDto): Promise<any> {
    return this.authService.sendPasswordResetEmail(sendPasswordResetEmailDto);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Get('sendEmailVerification')
  public async ssendEmailVerification(): Promise<any> {
    return this.authService.sendEmailVerification();
  }
}
