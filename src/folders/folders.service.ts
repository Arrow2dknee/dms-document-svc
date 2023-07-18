import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { FoldersRepository } from './folders.repository';
import { CreateFolderDto, FolderIdDto, UpdateFolderNameDto } from './dto';
import { FilesService } from '../files/files.service';
import { FolderMetadata } from './folder.pb';

@Injectable()
export class FoldersService {
  constructor(
    private readonly foldersRepository: FoldersRepository,
    private readonly filesService: FilesService,
  ) {}

  async createNewFolder(dto: CreateFolderDto): Promise<FolderMetadata> {
    const { name, user } = dto;
    const folder = await this.foldersRepository.findByName(name, user);
    if (folder) {
      throw new BadRequestException('Folder name already exists');
    }
    await this.foldersRepository.createFolderDoc(name, user);

    return {
      name,
    };
  }

  async updateFolderName(dto: UpdateFolderNameDto): Promise<FolderMetadata> {
    const { id, name, user } = dto;
    const existingFolder = await this.foldersRepository.findFolderOwnedByUser(
      user,
      id,
    );
    if (!existingFolder) {
      throw new NotFoundException('Folder does not exists');
    }
    // check if a folder with the name was created by logged-in user
    const folder = await this.foldersRepository.findByName(name, user);
    if (folder) {
      throw new BadRequestException('Folder name already exists');
    }
    await this.foldersRepository.updateFolder(id, name);

    return {
      name,
    };
  }

  async deleteFolderOwnedByUser(dto: FolderIdDto): Promise<void> {
    const { id, user } = dto;
    // find folder owned by user
    const folder = await this.foldersRepository.findFolderOwnedByUser(user, id);
    if (!folder) {
      throw new NotFoundException('Folder does not exists');
    }
    // find if any files exist for given folder id
    const data = await this.filesService.findAllFilesInFolder(user, id);
    if (data.length) {
      throw new BadRequestException(
        'Folder contains files. Remove all files before proceeding',
      );
    }

    await this.foldersRepository.deleteFolder(user, id);
  }
}
