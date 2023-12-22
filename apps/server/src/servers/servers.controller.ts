import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  InternalServerErrorException,
} from '@nestjs/common';
import { ServersService } from './servers.service';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUserServersDto } from './dto/get-user-server.dto';
import { GetServerDto } from './dto/get-server.dto';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Servers')
@Controller('servers')
export class ServersController {
  constructor(private readonly serversService: ServersService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  @ApiBody({
    type: CreateServerDto,
    description: 'Create a new server',
  })
  async createServer(@Request() req, @Body() createServerDto: CreateServerDto) {
    const result = await this.serversService.createServer(
      req.user,
      createServerDto
    );
    if (result == false) {
      throw new InternalServerErrorException('Something went wrong');
    }
    return result;
  }

  @Get()
  async findAll() {
    return await this.serversService.findAll();
  }

  // Join a server
  @Post('join/?serverId=:serverId&userId=:userId')
  @ApiResponse({
    type: Boolean,
  })
  async joinServer(
    @Param('serverId') serverId: string,
    @Param('userId') userId: string
  ): Promise<GetServerDto | boolean> {
    return await this.serversService.joinServer(+serverId, +userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServerDto: UpdateServerDto) {
    return this.serversService.update(+id, updateServerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serversService.remove(+id);
  }
}
