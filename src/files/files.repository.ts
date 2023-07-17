import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { File, FileDocument } from './schemas/files.schema';
import { CreateFileInterface } from '../common/interfaces/createFile.interface';

export class FilesRepository {
  constructor(
    @InjectModel(File.name) private readonly filesModel: Model<FileDocument>,
  ) {}

  async saveFile(dto: CreateFileInterface): Promise<FileDocument> {
    const file: FileDocument = await this.filesModel.create(dto);

    return file;
  }
}
