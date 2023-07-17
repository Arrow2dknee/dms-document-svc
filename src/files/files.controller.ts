import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { FilesService } from './files.service';
import {
  FILES_SERVICE_NAME,
  CreateFileResponse,
  UpdatePathResponse,
  FindOneResponse,
  FindAllResponse,
  DeleteFileResponse,
} from './file.pb';
import {
  CreateFileDto,
  FileIdDto,
  FindAllFilesDto,
  FileNameDto,
  UpdateFilePathDto,
} from './dto';

@Controller()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  /**
   * Insert method
   * @param dto
   * @returns
   */
  @GrpcMethod(FILES_SERVICE_NAME, 'CreateFile')
  async createFile(dto: CreateFileDto): Promise<CreateFileResponse> {
    const data = await this.filesService.createNewFile(dto);

    return {
      message: 'File created successfully',
      data,
    };
  }

  // Update method
  @GrpcMethod(FILES_SERVICE_NAME, 'UpdateFilePath')
  async moveFileToDifferentFolder(
    payload: UpdateFilePathDto,
  ): Promise<UpdatePathResponse> {
    await this.filesService.updateFilePath(payload.id, payload.folder);

    return {
      message: 'File path updated successfully',
      data: null,
    };
  }

  /**
   * Find One method
   * Find file created by user
   */
  @GrpcMethod(FILES_SERVICE_NAME, 'FindOne')
  async findFileByName(payload: FileNameDto): Promise<FindOneResponse> {
    const data = await this.filesService.findFileByName(payload.name);

    return {
      message: 'File fetched successfully',
      data,
    };
  }

  /**
   * Find All method
   * Find all files created by user
   */
  @GrpcMethod(FILES_SERVICE_NAME, 'FindAll')
  async findAllFiles(payload: FindAllFilesDto): Promise<FindAllResponse> {
    const data = await this.filesService.findFilesOwnedByUser(payload);

    return {
      message: 'Files fetched successfully',
      data,
    };
  }

  /**
   * Delete method
   * Delete file created by user
   */
  @GrpcMethod(FILES_SERVICE_NAME, 'DeleteFile')
  async deleteFile(payload: FileIdDto): Promise<DeleteFileResponse> {
    await this.filesService.removeFile(payload.id);

    return {
      message: 'File removed successfully',
      data: null,
    };
  }
}
