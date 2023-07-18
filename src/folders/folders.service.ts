import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Types } from 'mongoose';

import { FoldersRepository } from './folders.repository';
import { CreateFolderDto, UpdateFolderNameDto } from './dto';
import { FilesService } from '../files/files.service';
import { FolderMetadata } from './folder.pb';

@Injectable()
export class FoldersService {
  constructor(
    private readonly foldersRepository: FoldersRepository,
    private readonly filesService: FilesService,
  ) {}

  async createNewFolder(dto: CreateFolderDto): Promise<FolderMetadata> {
    const { name } = dto;
    const folder = await this.foldersRepository.findByName(name);
    if (folder) {
      throw new BadRequestException('Folder name already exists');
    }
    await this.foldersRepository.createFolderDoc(name);

    return {
      name,
    };
  }

  async updateFolderName(dto: UpdateFolderNameDto): Promise<FolderMetadata> {
    const { name } = dto;
    const folder = await this.foldersRepository.findByName(name);
    if (folder) {
      throw new BadRequestException('Folder name already exists');
    }
    await this.foldersRepository.updateFolder(name);

    return {
      name,
    };
  }

  async deleteFolderOwnedByUser(folderId: string) {
    // assume an user id
    const userId = new Types.ObjectId().toString();
    // find folder owned by user
    const folder = await this.foldersRepository.findFolderOwnedByUser(
      userId,
      folderId,
    );
    if (!folder) {
      throw new NotFoundException('Folder does not exists');
    }
    // find if any files exist for given folder id
    const data = await this.filesService.findAllFilesInFolder(userId, folderId);
    if (data.length) {
      throw new BadRequestException(
        'Folder contains files. Remove all files before proceeding',
      );
    }

    await this.foldersRepository.deleteFolder(userId, folderId);
  }
}
