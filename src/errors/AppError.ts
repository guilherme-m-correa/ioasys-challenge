class AppError extends Error {
  public readonly status: number;

  public readonly message: string;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
    this.name = 'AppError';
  }
}
export default AppError;
