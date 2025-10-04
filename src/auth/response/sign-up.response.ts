import { ApiProperty } from '@nestjs/swagger';
import { MetaDto } from '../../types/DataType';

class SignUpResponseData {
  @ApiProperty({ type: String, example: 'Name' })
  public firstName?: string;

  @ApiProperty({ type: String, example: 'Name' })
  public middleName?: string;

  @ApiProperty({ type: String, example: 'Name' })
  public lastName?: string;

  @ApiProperty({ type: String, example: 'test@test.com' })
  public email: string;

  @ApiProperty()
  public password: string;

  @ApiProperty()
  public accessToken: string;

  @ApiProperty()
  public refreshToken: string;
}

export class SignUpResponse {
  @ApiProperty()
  data: SignUpResponseData;

  @ApiProperty({ type: MetaDto })
  meta: MetaDto;
}
