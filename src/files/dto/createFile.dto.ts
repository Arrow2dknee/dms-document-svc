import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { CreateFileRequest } from '../file.pb';

export class CreateFileDto implements CreateFileRequest {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsString()
  @IsNotEmpty()
  public readonly extension: string;

  @IsString()
  @IsNotEmpty()
  public readonly content: string;

  @IsString()
  @IsOptional()
  permissions: string;

  @IsOptional()
  folderId: string;

  @IsOptional()
  userId: string;
}
