import type { HttpStatus } from '@nestjs/common';

export interface HttpError {
  status: HttpStatus;
  message: string;
}
