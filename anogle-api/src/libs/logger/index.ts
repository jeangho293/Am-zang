import { createLogger, transports, format } from 'winston';
import type { Request, Response } from 'express';

const colors = {
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  reset: '\x1b[0m', // 색상 초기화
};

const customFormat = format.printf(({ txId, message, level, method, url, statusCode, err }) => {
  const error = err as Error | undefined;

  if (error) {
    return `\n[level]: ${level}\n[service]: ${method}(${statusCode}) - ${url}\n[txId]: ${colors.yellow}${txId}${colors.reset}\n[error] ${colors.red}${error.stack}${colors.reset}`;
  }
  return `\n[level]: ${level}\n[service]: ${method}(${statusCode}) - ${url}\n[message]: ${message}\n[txId]:  ${colors.yellow}${txId}${colors.reset}`;
});

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
