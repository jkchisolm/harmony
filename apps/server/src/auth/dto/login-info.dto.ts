import { ApiProperty } from '@nestjs/swagger';

export class LoginInfoDto {
  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ required: false })
  username?: string;

  @ApiProperty()
  password: string;
}
