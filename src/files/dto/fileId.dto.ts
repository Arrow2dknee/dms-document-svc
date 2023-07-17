import { IsNotEmpty, IsMongoId } from 'class-validator';

export class FileIdDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly id: string;
}
