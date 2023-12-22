import { Injectable } from '@nestjs/common';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { PrismaService } from '../prisma.service';
import { GetUserServersDto } from './dto/get-user-server.dto';
import { GetServerDto } from './dto/get-server.dto';
import { User } from '@prisma/client';

@Injectable()
export class ServersService {
  constructor(private readonly prisma: PrismaService) {}

  async createServer(user: any, createServerDto: CreateServerDto) {
    const userInfo = await user;
    try {
      const result = await this.prisma.server.create({
        data: {
          ...createServerDto,
          owner: { connect: { id: userInfo.userId } },
        },
      });

      // add user to server
      await this.prisma.server.update({
        where: { id: result.id },
        data: {
          users: {
            connect: { id: userInfo.userId },
          },
        },
      });

      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async findAll() {
    return await this.prisma.server.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} server`;
  }

  findAllForUser(id: number): Promise<GetUserServersDto[]> {
    // gets all servers for user with specific id
    return this.prisma.user.findUnique({ where: { id } }).servers();
  }

  async joinServer(
    serverId: number,
    userId: number
  ): Promise<GetServerDto | boolean> {
    // adds user to server
    try {
      const result = await this.prisma.server.update({
        where: { id: serverId },
        data: {
          users: {
            connect: { id: userId },
          },
        },
      });
      return result;
    } catch (error) {
      return false;
    }
    // return this.prisma.server.update({
    //   where: { id: serverId },
    //   data: {
    //     users: {
    //       connect: { id: userId },
    //     },
    //   },
    // });
  }

  update(id: number, updateServerDto: UpdateServerDto) {
    return `This action updates a #${id} server`;
  }

  remove(id: number) {
    return `This action removes a #${id} server`;
  }
}
