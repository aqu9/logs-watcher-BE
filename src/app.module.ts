import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { websocketGateway } from './websocket.gateway';
import * as fs from 'fs';
import { logFilePath, logFolderPath } from './utils/constants';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, websocketGateway],
})
export class AppModule {
  constructor() {
    // check for logs directory exist if not exisit create it
    if (!fs.existsSync(logFolderPath)) {
      fs.mkdirSync(logFolderPath);
      if (!fs.existsSync(logFilePath)) {
        fs.writeFileSync(logFilePath, '');
      }
    }
  }
}
