import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { websocketGateway } from './websocket.gateway';
import { appendLogsinFile } from './utils/appendLoginFIle';
import { formatLog } from './utils/createLog';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly websocketService: websocketGateway,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/generateLog')
  async generateLog(@Body() body: { text?: string }): Promise<string> {
    await appendLogsinFile(
      formatLog('inside genrate logs endpoint.. calling logs service'),
      this.websocketService,
    );

    const logs = await this.appService.generateLog(body);
    this.websocketService.emitLog(logs);
    return logs;
  }
}
