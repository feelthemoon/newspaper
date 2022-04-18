import { Injectable } from '@nestjs/common';
import { appendFile, existsSync, mkdir } from 'fs';
import { promisify } from 'util';

const appendFilePromise = promisify(appendFile);
const mkdirPromise = promisify(mkdir);

export enum LogTypes {
  ERROR = 'error',
  WARN = 'warn',
  PRIMARY = 'log',
  TABLE = 'table',
}
@Injectable()
export class LoggerService {
  private fileDefaultPath = './logs/all.log';

  async logToFile(message: string, filePath?: string) {
    if (!existsSync('./logs')) {
      await mkdirPromise('./logs');
    }
    return appendFilePromise(
      filePath || this.fileDefaultPath,
      `[LOG ${new Date().toLocaleDateString()}:${new Date().toLocaleTimeString()}] - ${message}\n`,
    );
  }

  logToConsole(message: string, logType: LogTypes) {
    return console[LogTypes[logType]](
      `[LOG ${new Date().toLocaleDateString()}] - ${message}`,
    );
  }
}
