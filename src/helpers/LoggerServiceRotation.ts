import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
//npm i uuid

@Injectable()
export class LoggerServiceRotation {
  private logPath: string = './logs'; // Đường dẫn lưu trữ tệp log
  private maxFileSize: number = 1024 * 1024 * 10; // Kích thước tối đa của mỗi tệp log (10MB)

  private logLevels = {
    fatal: 'fatal',
    error: 'error',
    warn: 'warn',
    info: 'info',
    debug: 'debug',
    trace: 'trace',
  };

  constructor() {
    // Tạo thư mục lưu trữ log nếu chưa tồn tại
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }
  }

  log(message: string) {
 
    this.writeLog(this.logLevels.info, message);
  }

  error(message: string, trace: string) {
    this.writeLog(this.logLevels.error, `${message}\n${trace}`);
  }

  private writeLog(level: string, message: string) {
    const currentDate = new Date();
    const dateTime = `${format(currentDate, 'yyyy-MM-dd HH:mm:ss')}`;
    const logFileName = `${dateTime.split(' ')[0]}.log`;
    //const logFileName = `${currentDate.toISOString().split('T')[0]}.log`;
    const logFilePath = path.join(this.logPath, logFileName);

    // Kiểm tra kích thước tệp log và xoay tệp log nếu cần
    this.rotateLogFile(logFilePath);

    // Ghi log vào tệp
    const logEntry = `[${uuidv4()}] [${dateTime}] [${level.toUpperCase()}] ${message}\n`;
    //const logEntry = `[${currentDate.toISOString()}] [${level.toUpperCase()}] ${message}\n`;
    fs.appendFileSync(logFilePath, logEntry);
  }

  private rotateLogFile(logFilePath: string) {
    if (fs.existsSync(logFilePath)) {
      const stats = fs.statSync(logFilePath);
      if (stats.size > this.maxFileSize) {
        // Nếu kích thước tệp log vượt quá giới hạn, đổi tên tệp log để xoay log
        const currentDate = new Date();
        const dateTime = `${format(currentDate, 'yyyy-MM-dd HH:mm:ss')}`;
        const rotatedLogFileName = `${dateTime.split(' ')[0]}-old.log`;
        const rotatedLogFilePath = path.join(this.logPath, rotatedLogFileName);

        // Di chuyển tệp log hiện tại sang tệp xoay log
        fs.renameSync(logFilePath, rotatedLogFilePath);
      }
    }
  }
}
