/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'folder';

export interface FolderMetadata {
  id: string;
  name: string;
}

/** Create folder */
export interface CreateFolderRequest {
  name: string;
  user: string;
}

export interface CreateFolderResponse {
  message: string;
  data: FolderMetadata | undefined;
}

/** Update folder name */
export interface UpdateFolderNameRequest {
  id: string;
  name: string;
  user: string;
}

export interface UpdateFolderNameResponse {
  message: string;
  data: FolderMetadata | undefined;
}

/** Delete folder (if there are no files in folder) */
export interface DeleteFolderRequest {
  id: string;
  user: string;
}

export interface DeleteFolderResponse {
  message: string;
  data: string;
}

/** Get folders created by user */
export interface GetFoldersRequest {
  user: string;
  page: string;
  limit: string;
}

export interface GetFoldersResponse {
  message: string;
  data: FolderMetadata[];
}

export const FOLDER_PACKAGE_NAME = 'folder';

export interface FolderServiceClient {
  createFolder(request: CreateFolderRequest): Observable<CreateFolderResponse>;

  updateFolderName(
    request: UpdateFolderNameRequest,
  ): Observable<UpdateFolderNameResponse>;

  deleteFolder(request: DeleteFolderRequest): Observable<DeleteFolderResponse>;

  getFolders(request: GetFoldersRequest): Observable<GetFoldersResponse>;
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

  getFolders(
    request: GetFoldersRequest,
  ):
    | Promise<GetFoldersResponse>
    | Observable<GetFoldersResponse>
    | GetFoldersResponse;
}

export function FolderServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'createFolder',
      'updateFolderName',
      'deleteFolder',
      'getFolders',
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
