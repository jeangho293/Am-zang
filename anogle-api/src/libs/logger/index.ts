import { createLogger, transports, format } from 'winston';
import type { Request, Response } from 'express';

type Color = 'red' | 'yellow';

function colorize(text: string, color: Color) {
  const colors = {
    red: '\x1b[31m',
    yellow: '\x1b[33m',
  };

  return `${colors[color]}${text}${'\x1b[0m'}`;
}

const customFormat = format.printf(
  ({
    txId,
    message,
    level,
    method,
    url,
    statusCode,
    err,
  }: {
    txId: string;
    message: string;
    level: string;
    method: string;
    url: string;
    statusCode: number;
    err: unknown;
  }) => {
    const error = err as Error | undefined;

    if (error) {
      return `\n[level]: ${level}\n[service]: ${method}(${statusCode}) - ${url}\n[txId]: ${txId}\n[error] ${colorize(error.stack, 'red')}`;
    }
    return `\n[level]: ${level}\n[service]: ${method}(${statusCode}) - ${url}\n[message]: ${message}\n[txId]: ${colorize(txId, 'yellow')}`;
  }
);

export const logger = createLogger({
  format: format.combine(format.colorize(), customFormat),
  transports: [new transports.Console()],
});

export function getContextLogger(req: Request, res: Response, err?: Error) {
  const { txId } = res.locals;
  const { statusCode } = res;
  const { method, url } = req;

  return { txId, method, url, statusCode, err };
}
