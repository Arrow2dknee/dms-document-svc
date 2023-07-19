import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const error = {
        message: Object.values(errors[0].constraints).join(', '),
      };
      throw new RpcException(error);
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
