import type { Request, Response, NextFunction } from 'express';
import { isBoom } from '@hapi/boom';
import { isError } from 'joi';
import { getContextLogger, logger } from '@libs/logger';

function convertError(err: Error) {
  const errorObject = {
    statusCode: 500,
    serverMessage: 'An unexpected error occurred on the server.',
    clientMessage: 'An unexpected error occurred on the server.',
    stackTrace: '',
  };

  if (isBoom(err)) {
    errorObject.statusCode = err.output.statusCode;
    if (err.data) {
      errorObject.clientMessage = err.data.message;
    }
  } else if (isError(err)) {
    errorObject.statusCode = 400;
  }

  errorObject.serverMessage = err.message;
  errorObject.stackTrace = err.stack || '';

  return errorObject;
}

export const errorLoggerHandler = async (
  err: Error,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  const customError = convertError(err);

  res.status(customError.statusCode);
  res.json({ message: customError.clientMessage });

  logger.child(getContextLogger(req, res, err)).error(customError.serverMessage);
};
