import { Injectable } from '@nestjs/common';

import { FoldersRepository } from './folders.repository';

@Injectable()
export class FoldersService {
  constructor(private readonly foldersRepository: FoldersRepository) {}
}
