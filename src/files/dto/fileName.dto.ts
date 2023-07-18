import { IsNotEmpty, IsString, MinLength } from 'class-validator';

import { FindOneRequest } from '../file.pb';

export class FileNameDto implements FindOneRequest {
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  readonly user: string;
}
