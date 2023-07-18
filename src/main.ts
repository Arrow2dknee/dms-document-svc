import { Transport } from '@nestjs/microservices';
import { INestMicroservice } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app: INestMicroservice = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:5002',
        package: ['file', 'folder'],
        protoPath: [
          'node_modules/dms-proto/proto/file.proto',
          'node_modules/dms-proto/proto/folder.proto',
        ],
      },
    },
  );

  await app.listen();
}

bootstrap();
