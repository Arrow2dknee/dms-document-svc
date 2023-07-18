import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

import { UpdateFolderNameRequest } from '../folder.pb';

export class UpdateFolderNameDto implements UpdateFolderNameRequest {
  @MaxLength(25)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  readonly id: string;

  readonly user: string;
}
