import { IsNotEmpty, IsMongoId } from 'class-validator';

import { PaginationDto } from '../../common/dto/pagination.dto';

export class FindAllFilesDto extends PaginationDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly user: string;
}
