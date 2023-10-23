import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  displayName: string;

  @ApiProperty()
  username: string;
}

export class RegisterServiceResponseDto extends RegisterResponseDto {
  accessToken: string;
  refreshToken: string;
}
