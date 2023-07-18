import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Folder, FolderDocument } from './schemas/folders.schema';

export class FoldersRepository {
  constructor(
    @InjectModel(Folder.name)
    private readonly foldersModel: Model<FolderDocument>,
  ) {}

  async findByName(name: string): Promise<FolderDocument> {
    return this.foldersModel.findOne({ name, isDeleted: false });
  }

  async findFolderOwnedByUser(
    userId: string,
    folderId: string,
  ): Promise<FolderDocument> {
    return this.foldersModel.findOne({
      userId: new Types.ObjectId(userId),
      folderId: new Types.ObjectId(folderId),
      isDeleted: false,
    });
  }

  async createFolderDoc(name: string): Promise<FolderDocument> {
    return this.foldersModel.create(name);
  }

  async updateFolder(name: string): Promise<FolderDocument> {
    return this.foldersModel.findOneAndUpdate(
      {
        name,
        isDeleted: false,
      },
      {
        name,
        updatedAt: new Date(),
      },
      {
        new: true,
      },
    );
  }

  async deleteFolder(userId: string, folderId: string): Promise<void> {
    return this.foldersModel.findOneAndUpdate(
      {
        userId: new Types.ObjectId(userId),
        folderId: new Types.ObjectId(folderId),
        isDeleted: false,
      },
      {
        isDeleted: true,
        updatedAt: new Date(),
      },
      {
        new: true,
      },
    );
  }
}
