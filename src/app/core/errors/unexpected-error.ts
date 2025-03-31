import { AppError } from './app-error';

export class UnexpectedError extends AppError {
  constructor(message: string = '') {
    super(message);
    this.name = 'UnexpectedError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
