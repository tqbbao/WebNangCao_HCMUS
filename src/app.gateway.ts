// chat.gateway.ts

import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('chatToServer')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('chatToClient', payload);
  }

  @SubscribeMessage('userTyping') // Sự kiện người dùng nhập dữ liệu
  handleUserTyping(client: any, data: string) {
    // Gửi dữ liệu nhập của người dùng đến các client khác
    this.server.emit('userTyping', { id: client.id, data });
  }

  @SubscribeMessage('notification') // Sự kiện người dùng nhập dữ liệu
  handleNotification(client: any, data: string) {
    // Gửi dữ liệu nhập của người dùng đến các client khác
    this.server.emit('notification', { id: client.id, data });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterInit(server: Server) {
    this.logger.log('Init');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
