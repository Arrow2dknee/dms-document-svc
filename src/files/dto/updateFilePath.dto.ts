import { IsNotEmpty, IsMongoId, IsOptional } from 'class-validator';

export class UpdateFilePathDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly id: string;

  @IsMongoId()
  @IsOptional() // Optional because a file which is already inside a folder, could be moved to root
  readonly folder: string;
}
