import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { readLastLogLines } from './utils/readLogs';
import { formatLog } from './utils/createLog';
import { appendLogsinFile } from './utils/appendLoginFIle';

@WebSocketGateway()
export class websocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    const message = `Client connected with id: ${client.id}`;
    console.log(message);
    const newLog = formatLog(message);
    await appendLogsinFile(newLog);
    this.emitLog(newLog);
  }

  async handleDisconnect(client: Socket) {
    const message = `Client disconnected with id: ${client.id}`;
    const newLog = formatLog(message);
    await appendLogsinFile(newLog);
    console.log(message);
    this.emitLog(newLog);
  }

  @SubscribeMessage('fetchLastLogsLines')
  async fetchLastLogsLines(client: Socket) {
    await appendLogsinFile(formatLog('fetching last 10 lines of logs...'));
    const lastLogsLines = await readLastLogLines();
    this.server.to(client.id).emit('lastLogsLines', lastLogsLines);
  }

  emitLog = (logs: string) => {
    this.server.emit('logs', logs);
  };
}
