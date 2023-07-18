import { IsNotEmpty, IsMongoId, IsOptional } from 'class-validator';

import { UpdatePathRequest } from '../file.pb';

export class UpdateFilePathDto implements UpdatePathRequest {
  @IsMongoId()
  @IsNotEmpty()
  readonly id: string;

  @IsMongoId()
  @IsOptional() // Optional because a file which is already inside a folder, could be moved to root
  readonly folder: string;

  readonly user: string;
}
