import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { FoldersRepository } from './folders.repository';
import {
  CreateFolderDto,
  FindAllFoldersDto,
  FolderIdDto,
  UpdateFolderNameDto,
} from './dto';
import { FilesService } from '../files/files.service';
import { FolderMetadata } from './folder.pb';
import { FolderDocument } from './schemas/folders.schema';

@Injectable()
export class FoldersService {
  constructor(
    private readonly foldersRepository: FoldersRepository,
    @Inject(forwardRef(() => FilesService))
    private readonly filesService: FilesService,
  ) {}

  async findFolderById(folderId: string, user: string) {
    const folder = await this.foldersRepository.findFolderOwnedByUser(
      user,
      folderId,
    );
    if (!folder) {
      throw new RpcException({
        message: 'Folder does not exists',
      });
    }

    return folder;
  }

  async createNewFolder(dto: CreateFolderDto): Promise<FolderMetadata> {
    const { name, user } = dto;
    const folder = await this.foldersRepository.findByName(name, user);
    if (folder) {
      throw new RpcException({
        message: 'Folder name already exists',
      });
    }
    await this.foldersRepository.createFolderDoc(name, user);

    return {
      id: folder._id.toString(),
      name,
    };
  }

  async updateFolderName(dto: UpdateFolderNameDto): Promise<FolderMetadata> {
    const { id, name, user } = dto;
    await this.findFolderById(id, user);
    // check if a folder with the name was created by logged-in user
    const folder = await this.foldersRepository.findByName(name, user);
    if (folder) {
      throw new RpcException({
        message: 'Folder name already exists',
      });
    }
    await this.foldersRepository.updateFolder(id, name);

    return {
      id: folder._id.toString(),
      name,
    };
  }

  async deleteFolderOwnedByUser(dto: FolderIdDto): Promise<void> {
    const { id, user } = dto;
    // find folder owned by user
    await this.findFolderById(id, user);
    // find if any files exist for given folder id
    const data = await this.filesService.findAllFilesInFolder(user, id);
    if (data.length) {
      throw new RpcException({
        message: 'Folder contains files. Remove all files before proceeding',
      });
    }

    await this.foldersRepository.deleteFolder(user, id);
  }

  async getFoldersOwnedByUser(
    dto: FindAllFoldersDto,
  ): Promise<FolderMetadata[]> {
    const folders = await this.foldersRepository.foldersByUser(dto);

    return folders.map((folder: FolderDocument) => ({
      id: folder._id.toString(),
      name: folder.name,
    }));
  }
}
