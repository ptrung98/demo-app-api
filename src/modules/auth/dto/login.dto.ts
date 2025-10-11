import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginByTokenDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  accessToken: string;

  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
