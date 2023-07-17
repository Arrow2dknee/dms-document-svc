import { Injectable, BadRequestException } from '@nestjs/common';

import { FilesRepository } from './files.repository';
import { CreateFileDto, FindAllFilesDto } from './dto';
import { File } from './file.pb';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { FileMetadata } from '../common/interfaces/fileMetadata.interface';
import { FileDocument } from './schemas/files.schema';

@Injectable()
export class FilesService {
  constructor(private readonly filesRepository: FilesRepository) {}

  private async validateFileById(fileId: string) {
    const file = await this.filesRepository.findById(fileId);

    if (!file) {
      throw new BadRequestException('File does not exists');
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

  public async findFileByName(name: string): Promise<FileMetadata> {
    const file = await this.filesRepository.findByName(name);

    if (!file) {
      throw new BadRequestException('File does not exists');
    }

    return this.getFileMetadata(file);
  }

  public async createNewFile(dto: CreateFileDto): Promise<File> {
    // Validate if file name already exists
    const result = await this.filesRepository.findByName(dto.name);
    if (result) {
      throw new BadRequestException(
        'File name is taken. Choose another file name',
      );
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

  public async updateFilePath(fileId: string, folderId: string): Promise<void> {
    await this.validateFileById(fileId);
    await this.filesRepository.updatePath(fileId, folderId);
  }

  public async removeFile(fileId: string): Promise<void> {
    await this.validateFileById(fileId);
    await this.filesRepository.deleteFile(fileId);
  }
}
