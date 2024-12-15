import type { HttpError } from '@/common/errors/http-error.interface';
import { HttpStatus } from '@nestjs/common';
import { AxiosError } from 'axios';

export function toHttpError(err: unknown): HttpError {
  if (!(err instanceof AxiosError)) {
    throw err;
  }
  if (err.response) {
    console.dir(err.response.data, { depth: null });
    console.log(err.response.status);
    console.log(err.response.headers);

    return {
      status: HttpStatus.BAD_GATEWAY,
      message: `${err.response.status} - Bad response from external API`,
    };
  }
  if (err.request) {
    return {
      status: HttpStatus.GATEWAY_TIMEOUT,
      message: 'Failed to get the response from the API',
    };
  }
  throw err;
}
