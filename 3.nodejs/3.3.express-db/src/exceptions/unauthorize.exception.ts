export class UnauthorizeException extends Error {
  protected status: number;
  constructor(message: string) {
    super(message);
    this.status = 401;
  }
}
