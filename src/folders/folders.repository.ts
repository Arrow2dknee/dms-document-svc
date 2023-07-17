import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Folder, FolderDocument } from './schemas/folders.schema';

export class FoldersRepository {
  constructor(
    @InjectModel(Folder.name)
    private readonly foldersModel: Model<FolderDocument>,
  ) {}
}
