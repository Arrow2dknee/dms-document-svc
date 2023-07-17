import { Transport } from '@nestjs/microservices';
import { INestMicroservice } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';

import { AppModule } from './app.module';
import { protobufPackage } from './files/file.pb';

async function bootstrap() {
  const app: INestMicroservice = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:5002',
        package: protobufPackage,
        protoPath: join('node_modules/dms-proto/proto/file.proto'),
      },
    },
  );

  await app.listen();
}

bootstrap();
