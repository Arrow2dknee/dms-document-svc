import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class FileNameDto {
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
