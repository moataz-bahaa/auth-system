import { ReasonPhrases, StatusCodes } from 'http-status-codes';

class CustomError extends Error {
  constructor(message) {
    super(message);
  }
}

export class NotFoundError extends CustomError {
  constructor(errorDetails) {
    super(ReasonPhrases.NOT_FOUND);
    this.statusCode = StatusCodes.NOT_FOUND;
    this.errorDetails = errorDetails;
  }
}

export class BadRequestError extends CustomError {
  constructor(errorDetails) {
    super(ReasonPhrases.BAD_REQUEST);
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.errorDetails = errorDetails;
  }
}

export class UnAuthenticatedError extends CustomError {
  constructor(errorDetails) {
    super(ReasonPhrases.UNAUTHORIZED);
    this.statusCode = StatusCodes.UNAUTHORIZED;
    this.errorDetails = errorDetails;
  }
}

export class ForbidenError extends CustomError {
  constructor(errorDetails) {
    super(ReasonPhrases.FORBIDDEN);
    this.statusCode = StatusCodes.FORBIDDEN;
    this.errorDetails = errorDetails;
  }
}
