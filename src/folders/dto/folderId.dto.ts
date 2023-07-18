import { IsNotEmpty, IsMongoId } from 'class-validator';

import { DeleteFolderRequest } from '../folder.pb';

export class FolderIdDto implements DeleteFolderRequest {
  @IsMongoId()
  @IsNotEmpty()
  readonly id: string;

  readonly user: string;
}
