import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { File, FileDocument } from './schemas/files.schema';
import { CreateFileInterface } from '../common/interfaces/createFile.interface';
import { PaginationDto } from '../common/dto/pagination.dto';

export class FilesRepository {
  constructor(
    @InjectModel(File.name) private readonly filesModel: Model<FileDocument>,
  ) {}

  async findById(fileId: string, userId: string): Promise<FileDocument> {
    return this.filesModel
      .findOne({
        _id: new Types.ObjectId(fileId),
        userId,
        isDeleted: false,
      })
      .lean();
  }

  async findByName(name: string, userId: string): Promise<FileDocument> {
    return this.filesModel
      .findOne({
        name: new RegExp(name, 'i'),
        isDeleted: false,
        userId,
      })
      .lean();
  }

  async findAll(userId: string, dto: PaginationDto): Promise<FileDocument[]> {
    const { limit = '10', page = '1', search = '' } = dto;
    const resultsPerPage = parseInt(limit);
    const currentPage = parseInt(page) - 1;

    return this.filesModel
      .find({
        name: new RegExp(search, 'i'),
        userId,
        isDeleted: false,
        folderId: { $eq: null },
      })
      .select({
        _id: 1,
        name: 1,
        extension: 1,
        content: 1,
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

  async saveFile(dto: CreateFileInterface): Promise<FileDocument> {
    const file: FileDocument = await this.filesModel.create(dto);

    return file;
  }

  async updatePath(fileId: string, folderId: string): Promise<void> {
    const updateDto = {
      folderId: null,
      updatedAt: new Date(),
    };

    if (folderId) {
      updateDto.folderId = new Types.ObjectId(folderId);
    }

    await this.filesModel.findByIdAndUpdate(
      {
        _id: new Types.ObjectId(fileId),
        isDeleted: false,
      },
      updateDto,
      {
        new: true,
      },
    );
  }

  async deleteFile(fileId: string): Promise<void> {
    await this.filesModel.findByIdAndUpdate(
      {
        _id: new Types.ObjectId(fileId),
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

  async findFilesByFolderId(
    userId: string,
    folderId: string,
    limit = '10',
    page = '1',
  ): Promise<FileDocument[]> {
    const resultsPerPage = parseInt(limit);
    const currentPage = parseInt(page) - 1;

    return this.filesModel
      .find({
        userId: userId,
        folderId: new Types.ObjectId(folderId),
        isDeleted: false,
      })
      .select({
        _id: 1,
        name: 1,
        extension: 1,
        content: 1,
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
