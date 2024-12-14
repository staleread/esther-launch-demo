import { BadRequestException, type PipeTransform } from '@nestjs/common';
import type { ZodSchema } from 'zod';

export class ValidationPipe<T> implements PipeTransform<unknown, T> {
  constructor(private readonly schema: ZodSchema<T>) {}

  transform(value: unknown): T {
    const result = this.schema.safeParse(value);

    if (result.success) {
      return result.data;
    }
    throw new BadRequestException(result.error.format());
  }
}
