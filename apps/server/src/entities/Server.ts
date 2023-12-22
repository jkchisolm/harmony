import { ApiProperty } from '@nestjs/swagger';
import { User } from './User';

export class Server {
  // id Int @default(autoincrement()) @id
  // name String
  // description String
  // createdAt DateTime @default(now())
  // updatedAt DateTime @updatedAt
  // users User[]

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  ownerId: number;

  @ApiProperty()
  users: User[];
}
