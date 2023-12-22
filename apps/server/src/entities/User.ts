import { ApiProperty } from '@nestjs/swagger';
import { Server } from './Server';

export class User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  displayName: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  birthdate: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  servers: Server[];

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  refreshTokenExpiryDate: Date;
}
