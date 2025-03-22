import { createLogger, transports, format } from 'winston';
import type { Request, Response } from 'express';

enum Color {
  RED = '\x1b[31m',
  YELLOW = '\x1b[33m',
}

function colorize(text: string, color: Color) {
  return `${color}${text}${'\x1b[0m'}`;
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
    err: any;
  }) => {
    if (err) {
      return `\n[level]: ${level}\n[service]: ${method}(${err.status}) - ${url} (${message})\n[txId]: ${colorize(txId, Color.RED)}\n[error] ${colorize(err.stack, Color.RED)}`;
    }
    return `\n[level]: ${level}\n[service]: ${method}(${statusCode}) - ${url} (${message})\n[txId]: ${colorize(txId, Color.YELLOW)}`;
  }
);

export const logger = createLogger({
  format: format.combine(format.colorize(), customFormat),
  transports: [new transports.Console()],
});

export function getContextLogger(req: Request, res: Response, err?: Error) {
  const {
    statusCode,
    locals: { txId },
  } = res;
  const { method, url } = req;

  return { txId, method, url, statusCode, err };
}
