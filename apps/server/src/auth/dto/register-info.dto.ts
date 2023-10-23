import { ApiProperty } from '@nestjs/swagger';

export class RegisterInfoDto {
  @ApiProperty()
  displayName: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  birthdate: Date;
}
