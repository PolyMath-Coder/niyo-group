import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { EventsService } from './events.service';
import { Server, Socket } from 'socket.io';


@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server
  constructor(private readonly eventsService: EventsService) {}

  @SubscribeMessage('message')
  async streamTaskData(@MessageBody() data: string, @ConnectedSocket() client: Socket ) {
    const response = await this.eventsService.streamTaskData();
    client.emit('all-tasks', response)
  }

  @SubscribeMessage('message')
  async streamUsers(@MessageBody() data: any, @ConnectedSocket() client: Socket): Promise<void> {
    const response = await this.eventsService.streamAllUsers();
    client.emit('all-users', response)
   
  }
}
