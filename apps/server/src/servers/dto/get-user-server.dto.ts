import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../entities/User';

// dto for a server response
export class GetUserServersDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  createdAt: Date;
}
