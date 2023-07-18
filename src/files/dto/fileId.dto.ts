import { IsNotEmpty, IsMongoId } from 'class-validator';

import { DeleteFileRequest } from '../file.pb';

export class FileIdDto implements DeleteFileRequest {
  @IsMongoId()
  @IsNotEmpty()
  readonly id: string;

  readonly user: string;
}
