import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class UpdateFolderNameDto {
  @MaxLength(25)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
