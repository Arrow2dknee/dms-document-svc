import { IsNotEmpty, IsMongoId } from 'class-validator';

export class FolderIdDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly id: string;
}
