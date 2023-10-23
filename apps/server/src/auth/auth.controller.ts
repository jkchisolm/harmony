import { Body, Controller, Post, Get, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma, User } from '@prisma/client';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginInfoDto } from './dto/login-info.dto';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() userInfo: Prisma.UserCreateInput): Promise<User> {
    // Convert supplied date to a Date object
    userInfo.birthdate = new Date(userInfo.birthdate);
    return this.authService.register(userInfo);
  }

  @Get('login')
  @ApiResponse({
    type: LoginResponseDto,
    status: 200,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async loginUser(
    @Body() userInfo: LoginInfoDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<LoginResponseDto> {
    const data = await this.authService.login(userInfo);
    response.cookie('accessToken', data.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    response.cookie('refreshToken', data.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return { displayName: data.displayName, username: data.username };
  }
}
