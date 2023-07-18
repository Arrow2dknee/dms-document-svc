/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'folder';

export interface FolderMetadata {
  name: string;
}

/** Create folder */
export interface CreateFolderRequest {
  name: string;
}

export interface CreateFolderResponse {
  message: string;
  data: FolderMetadata | undefined;
}

/** Update folder name */
export interface UpdateFolderNameRequest {
  name: string;
}

export interface UpdateFolderNameResponse {
  message: string;
  data: FolderMetadata | undefined;
}

/** Delete folder (if there are no files in folder) */
export interface DeleteFolderRequest {
  id: string;
}

export interface DeleteFolderResponse {
  message: string;
  data: string;
}

export const FOLDER_PACKAGE_NAME = 'folder';

export interface FolderServiceClient {
  createFolder(request: CreateFolderRequest): Observable<CreateFolderResponse>;

  updateFolderName(
    request: UpdateFolderNameRequest,
  ): Observable<UpdateFolderNameResponse>;

  deleteFolder(request: DeleteFolderRequest): Observable<DeleteFolderResponse>;
}

export interface FolderServiceController {
  createFolder(
    request: CreateFolderRequest,
  ):
    | Promise<CreateFolderResponse>
    | Observable<CreateFolderResponse>
    | CreateFolderResponse;

  updateFolderName(
    request: UpdateFolderNameRequest,
  ):
    | Promise<UpdateFolderNameResponse>
    | Observable<UpdateFolderNameResponse>
    | UpdateFolderNameResponse;

  deleteFolder(
    request: DeleteFolderRequest,
  ):
    | Promise<DeleteFolderResponse>
    | Observable<DeleteFolderResponse>
    | DeleteFolderResponse;
}

export function FolderServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'createFolder',
      'updateFolderName',
      'deleteFolder',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('FolderService', method)(
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
      GrpcStreamMethod('FolderService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const FOLDER_SERVICE_NAME = 'FolderService';
