import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    async login(loginDto: LoginDto) {
        return { message: 'Đăng nhập thành công' };
    }

    async register(registerDto: RegisterDto) {
        return { message: 'Đăng ký thành công' };
    }
    
}
