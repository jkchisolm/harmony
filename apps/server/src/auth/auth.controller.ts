import { Body, Controller, Post, Get, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma, User } from '@prisma/client';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginInfoDto } from './dto/login-info.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { RegisterInfoDto } from './dto/register-info.dto';
import { RegisterResponseDto } from './dto/register-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({
    type: RegisterInfoDto,
    description:
      'Register a new user. AccessToken and RefreshToken stored in cookies',
  })
  @ApiResponse({
    type: RegisterResponseDto,
    status: 201,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input',
  })
  @ApiResponse({
    status: 409,
    description: 'User already exists.',
  })
  async registerUser(
    @Body() userInfo: RegisterInfoDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<RegisterResponseDto> {
    // Convert supplied date to a Date object
    userInfo.birthdate = new Date(userInfo.birthdate);
    const data = await this.authService.register(userInfo);
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

  @Post('login')
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
