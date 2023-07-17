/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'file';

/** Create file */
export interface CreateFileRequest {
  name: string;
  extension: string;
  content: string;
  permissions: string;
  folderId: string;
  userId: string;
}

export interface File {
  id: string;
  name: string;
}

export interface CreateFileResponse {
  message: string;
  data: File | undefined;
}

export const FILE_PACKAGE_NAME = 'file';

export interface FilesServiceClient {
  createFile(request: CreateFileRequest): Observable<CreateFileResponse>;
}

export interface FilesServiceController {
  createFile(
    request: CreateFileRequest,
  ):
    | Promise<CreateFileResponse>
    | Observable<CreateFileResponse>
    | CreateFileResponse;
}

export function FilesServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['createFile'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('FilesService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('FilesService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const FILES_SERVICE_NAME = 'FilesService';
