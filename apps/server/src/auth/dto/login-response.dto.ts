import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty()
  displayName: string;

  @ApiProperty()
  username: string;
}

export class LoginServiceResponseDto extends LoginResponseDto {
  accessToken: string;
  refreshToken: string;
}
