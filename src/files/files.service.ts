import { Injectable } from '@nestjs/common';

import { FilesRepository } from './files.repository';
import { CreateFileDto } from './dto';
import { File } from './file.pb';

@Injectable()
export class FilesService {
  constructor(private readonly filesRepository: FilesRepository) {}

  public async createNewFile(dto: CreateFileDto): Promise<File> {
    const file = await this.filesRepository.saveFile(dto);

    return {
      id: file._id.toString(),
      name: `${file.name}.${file.extension}`,
    };
  }
}
