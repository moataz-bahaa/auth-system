import { StatusCodes } from 'http-status-codes';

const errorHandler = (err, req, res, next) => {
  console.log(err);
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    status: 'Error',
    message: err.message,
  };

  if (err.errorDetails) {
    defaultError.errorDetails = err.errorDetails;
  }

  res.status(defaultError.statusCode).json(defaultError);
};

export default errorHandler;
