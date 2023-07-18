import { Body, Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { FoldersService } from './folders.service';
import { CreateFolderDto, UpdateFolderNameDto, FolderIdDto } from './dto';
import {
  FOLDER_SERVICE_NAME,
  CreateFolderResponse,
  UpdateFolderNameResponse,
  DeleteFolderResponse,
} from './folder.pb';

@Controller()
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @GrpcMethod(FOLDER_SERVICE_NAME, 'CreateFolder')
  async createFolder(
    @Body() dto: CreateFolderDto,
  ): Promise<CreateFolderResponse> {
    const data = await this.foldersService.createNewFolder(dto);

    return {
      message: 'Folder created successfully',
      data,
    };
  }

  @GrpcMethod(FOLDER_SERVICE_NAME, 'UpdateFolderName')
  async updateFolder(
    @Body() dto: UpdateFolderNameDto,
  ): Promise<UpdateFolderNameResponse> {
    const data = await this.foldersService.updateFolderName(dto);

    return {
      message: 'Folder updated successfully',
      data,
    };
  }

  @GrpcMethod(FOLDER_SERVICE_NAME, 'DeleteFolder')
  async deleteFolder(@Body() dto: FolderIdDto): Promise<DeleteFolderResponse> {
    await this.foldersService.deleteFolderOwnedByUser(dto);

    return {
      message: 'Folder deleted successfully',
      data: null,
    };
  }
}
