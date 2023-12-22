import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUserDto } from './dto/get-user.dto';
import { GetServerDto } from './dto/get-servers.dto';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // Gets the current user
  @UseGuards(AuthGuard)
  @Get('@me')
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: GetUserDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async findMe(@Request() req): Promise<User> {
    const userRequest = await req.user;
    console.log('in me route');
    console.log(userRequest);
    const user = await this.userService.findUser({ id: userRequest.userId });
    if (!user) {
      throw new NotFoundException(`User ${userRequest.userId} not found`);
    }
    return user;
  }

  // Gets a user by their specific id
  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: GetUserDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findUser({ id: Number(id) });
    console.log(user);
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  // Gets a current user's servers
  @UseGuards(AuthGuard)
  @Get('@me/servers')
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: [GetServerDto],
  })
  async findUserServers(@Request() req) {
    const user = await req.user;
    return await this.userService.findUserServers(user.userId);
  }
}
