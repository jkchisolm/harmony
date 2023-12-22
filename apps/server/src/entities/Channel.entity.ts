import { ApiProperty } from '@nestjs/swagger';

export class Channel {
  @ApiProperty({ required: true })
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
  serverId: number;
}
