import { Injectable } from '@nestjs/common';
import { appendLogsinFile } from './utils/appendLoginFIle';
import { formatLog } from './utils/createLog';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async generateLog(body: { text?: string }): Promise<string> {
    const newLog = formatLog(body.text);
    await appendLogsinFile(newLog);

    return newLog;
  }
}
