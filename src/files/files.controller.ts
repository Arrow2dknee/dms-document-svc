import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { FilesService } from './files.service';
import { FILES_SERVICE_NAME, CreateFileResponse } from './file.pb';
import { CreateFileDto } from './dto';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @GrpcMethod(FILES_SERVICE_NAME, 'CreateFile')
  async createFile(dto: CreateFileDto): Promise<CreateFileResponse> {
    const data = await this.filesService.createNewFile(dto);

    return {
      message: 'File created successfully',
      data,
    };
  }
}
