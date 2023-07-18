import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

import { CreateFolderRequest } from '../folder.pb';

export class CreateFolderDto implements CreateFolderRequest {
  @MaxLength(25)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
