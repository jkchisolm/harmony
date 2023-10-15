import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findUser({ id: Number(id) });
    console.log(user);
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  @Post()
  async registerUser() {
    // For now just create dummy user, eventually take input
    const user = await this.userService.createUser({
      email: 'john@doe.com',
      displayName: 'johnDoe',
      username: 'johnDoe',
      password: 'johnDoe',
      birthdate: new Date(),
    });

    return user;
  }
}
