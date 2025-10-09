import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginByTokenDto, LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('login-by-token')
  async loginByToken(@Body() loginByTokenDto: LoginByTokenDto) {
    return this.authService.loginByToken(loginByTokenDto);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

//   @Get('profile')
//   @UseGuards(AuthGuard)
//   async getProfile(@Request() req) {
//     return req.user;
//   }
}
