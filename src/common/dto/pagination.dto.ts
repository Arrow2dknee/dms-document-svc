import { IsOptional, IsNumberString, IsString } from 'class-validator';

export class PaginationDto {
  @IsNumberString()
  @IsOptional()
  page: string;

  @IsNumberString()
  @IsOptional()
  limit: string;

  @IsString()
  @IsOptional()
  search: string;
}
