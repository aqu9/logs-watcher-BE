import { logFilePath } from './constants';
import * as fs from 'fs';

export const appendLogsinFile = (logData: any, socket?: any) => {
  if (!fs.existsSync(logFilePath)) {
    fs.writeFileSync(logFilePath, ''); // Create an empty file
  }

  fs.appendFileSync(logFilePath, logData + '\n');
  if (socket) {
    socket.emitLog(logData);
  }
  return 'logs Appended';
};
