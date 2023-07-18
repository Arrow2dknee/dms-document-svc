import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Folder, FolderDocument } from './schemas/folders.schema';
import { FindAllFoldersDto } from './dto';

export class FoldersRepository {
  constructor(
    @InjectModel(Folder.name)
    private readonly foldersModel: Model<FolderDocument>,
  ) {}

  async findByName(name: string, userId: string): Promise<FolderDocument> {
    return this.foldersModel.findOne({ name, userId, isDeleted: false }).lean();
  }

  async findFolderOwnedByUser(
    userId: string,
    folderId: string,
  ): Promise<FolderDocument> {
    return this.foldersModel
      .findOne({
        _id: new Types.ObjectId(folderId),
        userId,
        isDeleted: false,
      })
      .lean();
  }

  async createFolderDoc(name: string, userId: string): Promise<FolderDocument> {
    return this.foldersModel.create({ name, userId });
  }

  async updateFolder(folderId: string, name: string): Promise<FolderDocument> {
    return this.foldersModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(folderId),
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
        _id: new Types.ObjectId(folderId),
        userId,
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

  async foldersByUser(dto: FindAllFoldersDto): Promise<FolderDocument[]> {
    const { limit = '10', page = '1' } = dto;
    const resultsPerPage = parseInt(limit);
    const currentPage = parseInt(page) - 1;

    return this.foldersModel
      .find({
        userId: dto.user,
        isDeleted: false,
      })
      .select({
        _id: 1,
        name: 1,
      })
      .populate({
        path: 'folderId',
        select: {
          _id: 1,
          name: 1,
        },
      })
      .limit(resultsPerPage)
      .skip(resultsPerPage * currentPage)
      .sort({ updatedAt: 'desc' })
      .exec();
  }
}
