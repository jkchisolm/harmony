import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { LoginInfoDto } from './dto/login-info.dto';
import { LoginServiceResponseDto } from './dto/login-response.dto';
import { RegisterInfoDto } from './dto/register-info.dto';
import { RegisterServiceResponseDto } from './dto/register-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService
  ) {}

  generateTokens = async (user: User) => {
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
      accessToken,
      refreshToken,
    };
  };

  async register(
    data: RegisterInfoDto
  ): Promise<RegisterServiceResponseDto | null> {
    const saltOrRounds = 10;
    data.password = bcrypt.hashSync(data.password, saltOrRounds);
    try {
      const result = await this.prisma.user.create({
        data,
      });
      const { accessToken, refreshToken } = await this.generateTokens(result);

      return {
        id: result.id,
        displayName: result.displayName,
        username: result.username,
        accessToken,
        refreshToken,
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ConflictException('User already exists.');
        }
      } else if (e instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException('Invalid data. ' + e.message.toString());
      }
    }
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
      throw new NotFoundException('User not found.');
    }

    const user = results[0];
    const isMatch = await bcrypt.compareSync(data.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password.');
    }

    const { accessToken, refreshToken } = await this.generateTokens(user);

    return {
      id: user.id,
      displayName: user.displayName,
      username: user.username,
      accessToken,
      refreshToken,
    };
  }
}
