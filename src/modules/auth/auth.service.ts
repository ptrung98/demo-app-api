import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { phoneNumber: loginDto.phoneNumber },
    });
    if (!user) throw new UnauthorizedException('Số điện thoại không tồn tại');

    const valid = await bcrypt.compare(loginDto.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Sai mật khẩu');

    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION || '15m',
    });

    const refreshToken = await this.jwtService.signAsync(
      { sub: user.id },
      {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION || '7d',
      },
    );

    const decoded: any = this.jwtService.decode(refreshToken);
    const expiresAt = new Date(decoded.exp * 1000);

    await this.prisma.refreshToken.create({
      data: { token: refreshToken, userId: user.id, expiresAt },
    });

    return {
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email, role: user.role },
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { phoneNumber: registerDto.phoneNumber },
    });
    if (existingUser) {
      throw new BadRequestException('Số điện thoại đã được đăng ký');
    }

    // 2️⃣ Hash mật khẩu
    const passwordHash = await bcrypt.hash(registerDto.password, 10);

    // 3️⃣ Tạo user mới
    const user = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        phoneNumber: registerDto.phoneNumber,
        passwordHash,
        name: registerDto.name,
        role: 'USER',
      },
    });

    // 4️⃣ Tạo token (nếu muốn tự động login sau khi đăng ký)
    // const accessToken = await this.jwtService.signAsync(
    //   { sub: user.id, email: user.email, role: user.role },
    //   {
    //     secret: process.env.ACCESS_TOKEN_SECRET,
    //     expiresIn: process.env.ACCESS_TOKEN_EXPIRATION || '15m',
    //   },
    // );

    // const refreshToken = await this.jwtService.signAsync(
    //   { sub: user.id },
    //   {
    //     secret: process.env.REFRESH_TOKEN_SECRET,
    //     expiresIn: process.env.REFRESH_TOKEN_EXPIRATION || '7d',
    //   },
    // );

    // const decoded: any = this.jwtService.decode(refreshToken);
    // const expiresAt = new Date(decoded.exp * 1000);

    // await this.prisma.refreshToken.create({
    //   data: { token: refreshToken, userId: user.id, expiresAt },
    // });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    //   accessToken,
    //   refreshToken,
    };
  }
}
