/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "file";

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

/** Update file path */
export interface UpdatePathRequest {
  id: string;
  folder: string;
}

export interface UpdatePathResponse {
  message: string;
  data: string;
}

/** Find file by name */
export interface FindOneRequest {
  name: string;
}

export interface FindOneResponse {
  message: string;
  data: FileMetadata | undefined;
}

/** Find all files */
export interface FindAllRequest {
  user: string;
  page: string;
  limit: string;
  search: string;
}

export interface FileMetadata {
  id: string;
  name: string;
  content: string;
}

export interface FindAllResponse {
  message: string;
  data: FileMetadata[];
}

/** Delete file */
export interface DeleteFileRequest {
  id: string;
}

export interface DeleteFileResponse {
  message: string;
  data: string;
}

export const FILE_PACKAGE_NAME = "file";

export interface FilesServiceClient {
  createFile(request: CreateFileRequest): Observable<CreateFileResponse>;

  updateFilePath(request: UpdatePathRequest): Observable<UpdatePathResponse>;

  findOne(request: FindOneRequest): Observable<FindOneResponse>;

  findAll(request: FindAllRequest): Observable<FindAllResponse>;

  deleteFile(request: DeleteFileRequest): Observable<DeleteFileResponse>;
}

export interface FilesServiceController {
  createFile(
    request: CreateFileRequest,
  ): Promise<CreateFileResponse> | Observable<CreateFileResponse> | CreateFileResponse;

  updateFilePath(
    request: UpdatePathRequest,
  ): Promise<UpdatePathResponse> | Observable<UpdatePathResponse> | UpdatePathResponse;

  findOne(request: FindOneRequest): Promise<FindOneResponse> | Observable<FindOneResponse> | FindOneResponse;

  findAll(request: FindAllRequest): Promise<FindAllResponse> | Observable<FindAllResponse> | FindAllResponse;

  deleteFile(
    request: DeleteFileRequest,
  ): Promise<DeleteFileResponse> | Observable<DeleteFileResponse> | DeleteFileResponse;
}

export function FilesServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createFile", "updateFilePath", "findOne", "findAll", "deleteFile"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("FilesService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("FilesService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const FILES_SERVICE_NAME = "FilesService";
