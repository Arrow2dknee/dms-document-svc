import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { FilesRepository } from './files.repository';
import {
  CreateFileDto,
  FileIdDto,
  FileNameDto,
  FindAllFilesDto,
  UpdateFilePathDto,
} from './dto';
import { File, FilesInFolder } from './file.pb';
import { PaginationDto } from '../common/dto/pagination.dto';
import { FileMetadata } from '../common/interfaces/fileMetadata.interface';
import { FileDocument } from './schemas/files.schema';
import { FoldersService } from '../folders/folders.service';

@Injectable()
export class FilesService {
  constructor(
    private readonly filesRepository: FilesRepository,
    @Inject(forwardRef(() => FoldersService))
    private readonly foldersService: FoldersService,
  ) {}

  private async validateFileById(fileId: string, userId: string) {
    const file = await this.filesRepository.findById(fileId, userId);

    if (!file) {
      throw new RpcException({
        message: 'File does not exists',
      });
    }

    return file;
  }

  private getFileMetadata(file: FileDocument): FileMetadata {
    return {
      id: file._id.toString(),
      name: `${file.name}.${file.extension}`,
      content: file.content,
    };
  }

  public async findFileByName(dto: FileNameDto): Promise<FileMetadata> {
    const { name, user } = dto;
    const file = await this.filesRepository.findByName(name, user);

    if (!file) {
      throw new RpcException({
        message: 'File does not exists',
      });
    }

    return this.getFileMetadata(file);
  }

  public async createNewFile(dto: CreateFileDto): Promise<File> {
    // Validate if file name already exists
    const result = await this.filesRepository.findByName(dto.name, dto.userId);
    if (result) {
      throw new RpcException({
        message: 'File name is taken. Choose another file name',
      });
    }
    const file = await this.filesRepository.saveFile(dto);

    return {
      id: file._id.toString(),
      name: `${file.name}.${file.extension}`,
    };
  }

  public async findFilesOwnedByUser(
    payload: FindAllFilesDto,
  ): Promise<FileMetadata[]> {
    const { user } = payload;
    const dto: PaginationDto = {
      limit: payload.limit,
      page: payload.page,
      search: payload.search,
    };

    const files = await this.filesRepository.findAll(user, dto);

    return files.map((file) => ({
      id: file._id.toString(),
      name: `${file.name}.${file.extension}`,
      content: file.content,
    }));
  }

  public async updateFilePath(dto: UpdateFilePathDto): Promise<void> {
    const { id, folder, user } = dto;

    await this.validateFileById(id, user);
    await this.foldersService.findFolderById(folder, user);
    await this.filesRepository.updatePath(id, folder);
  }

  public async removeFile(dto: FileIdDto): Promise<void> {
    const { id, user } = dto;
    await this.validateFileById(id, user);
    await this.filesRepository.deleteFile(id);
  }

  public async findAllFilesInFolder(
    userId: string,
    folderId: string,
    limit = '10',
    page = '1',
  ): Promise<FilesInFolder[]> {
    const files = await this.filesRepository.findFilesByFolderId(
      userId,
      folderId,
      limit,
      page,
    );

    return files.map((file) => ({
      id: file._id.toString(),
      name: `${file.name}.${file.extension}`,
      content: file.content,
      folderName: file.folderId.name,
    }));
  }
}
