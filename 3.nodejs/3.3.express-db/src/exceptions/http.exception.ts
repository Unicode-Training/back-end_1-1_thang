export class HttpException extends Error {
  protected status: number;
  protected errors?: { [key: string]: string };
  constructor(message: string, status: number, errors = {}) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}
