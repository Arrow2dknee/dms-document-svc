import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FilesModule } from './files/files.module';
import { FoldersModule } from './folders/folders.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: 'mongodb+srv://antrosh92:rM5ttF9d2vgkbNDN@zi-assignment.an56rip.mongodb.net/dmscore?retryWrites=true&w=majority',
      }),
    }),
    FilesModule,
    FoldersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
