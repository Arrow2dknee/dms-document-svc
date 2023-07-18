import {
  IsNotEmpty,
  IsMongoId,
  IsNumberString,
  IsOptional,
} from 'class-validator';

import { GetFilesOfFolderRequest } from '../file.pb';

export class FilesInFolderDto implements GetFilesOfFolderRequest {
  @IsMongoId()
  @IsNotEmpty()
  readonly folder: string;

  @IsNumberString()
  @IsOptional()
  page: string;

  @IsNumberString()
  @IsOptional()
  limit: string;

  readonly user: string;
}
