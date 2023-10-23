import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  LoginResponseDto,
  LoginServiceResponseDto,
} from './dto/login-response.dto';
import { LoginInfoDto } from './dto/login-info.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService
  ) {}

  async register(data: Prisma.UserCreateInput): Promise<User> {
    const saltOrRounds = 10;
    data.password = bcrypt.hashSync(data.password, saltOrRounds);
    return this.prisma.user.create({
      data,
    });
  }

  async login(data: LoginInfoDto): Promise<LoginServiceResponseDto | null> {
    const results = await this.prisma.user.findMany({
      where: {
        OR: [
          {
            email: {
              equals: data.email,
            },
          },
          {
            username: {
              equals: data.username,
            },
          },
        ],
      },
    });

    if (results.length === 0) {
      throw new UnauthorizedException('User not found.');
    }

    const user = results[0];
    const isMatch = await bcrypt.compareSync(data.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password.');
    }

    // Generate a new accessToken and refreshToken
    const accessToken = this.jwt.sign({ userId: user.id }, { expiresIn: '1h' });

    let refreshToken;

    // If there isn't a refresh token, or it's expired, generate a new one
    if (
      !user.refreshToken ||
      new Date(user.refreshTokenExpiryDate) < new Date()
    ) {
      refreshToken = this.jwt.sign({ userId: user.id }, { expiresIn: '7d' });

      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          refreshToken,
          refreshTokenExpiryDate: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
          ).toISOString(),
        },
      });
    } else {
      refreshToken = user.refreshToken;
    }

    return {
      displayName: user.displayName,
      username: user.username,
      accessToken,
      refreshToken,
    };
  }
}
