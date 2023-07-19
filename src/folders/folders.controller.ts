import { Controller, UseFilters, UsePipes } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { FoldersService } from './folders.service';
import {
  CreateFolderDto,
  UpdateFolderNameDto,
  FolderIdDto,
  FindAllFoldersDto,
} from './dto';
import {
  FOLDER_SERVICE_NAME,
  CreateFolderResponse,
  UpdateFolderNameResponse,
  DeleteFolderResponse,
  GetFoldersResponse,
} from './folder.pb';
import { ExceptionFilter } from '../common/filters/exception.filter';
import { ValidationPipe } from '../common/pipes/validation.pipe';

@Controller()
@UseFilters(new ExceptionFilter())
@UsePipes(new ValidationPipe())
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @GrpcMethod(FOLDER_SERVICE_NAME, 'CreateFolder')
  async createFolder(dto: CreateFolderDto): Promise<CreateFolderResponse> {
    const data = await this.foldersService.createNewFolder(dto);

    return {
      message: 'Folder created successfully',
      data,
    };
  }

  @GrpcMethod(FOLDER_SERVICE_NAME, 'UpdateFolderName')
  async updateFolder(
    dto: UpdateFolderNameDto,
  ): Promise<UpdateFolderNameResponse> {
    const data = await this.foldersService.updateFolderName(dto);

    return {
      message: 'Folder updated successfully',
      data,
    };
  }

  @GrpcMethod(FOLDER_SERVICE_NAME, 'DeleteFolder')
  async deleteFolder(dto: FolderIdDto): Promise<DeleteFolderResponse> {
    await this.foldersService.deleteFolderOwnedByUser(dto);

    return {
      message: 'Folder deleted successfully',
      data: null,
    };
  }

  @GrpcMethod(FOLDER_SERVICE_NAME, 'GetFolders')
  async getFolders(dto: FindAllFoldersDto): Promise<GetFoldersResponse> {
    const data = await this.foldersService.getFoldersOwnedByUser(dto);

    return {
      message: 'Folders fetched successfully',
      data,
    };
  }
}
