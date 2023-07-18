import {
  IsNotEmpty,
  IsMongoId,
  IsNumberString,
  IsOptional,
} from 'class-validator';

export class FindAllFoldersDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly user: string;

  @IsNumberString()
  @IsOptional()
  page: string;

  @IsNumberString()
  @IsOptional()
  limit: string;
}
