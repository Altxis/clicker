import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CounterService } from '../counter/counter.service';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private counterService: CounterService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: any, @ConnectedSocket() client: Socket): void {
    console.log('Received message:', data);

    // Echo back to sender
    client.emit('message', {
      ...data,
      timestamp: new Date().toISOString(),
    });
  }

  @SubscribeMessage('broadcast')
  handleBroadcast(@MessageBody() data: any): void {
    console.log('Broadcasting:', data);

    // Broadcast to all connected clients
    this.server.emit('broadcast', {
      ...data,
      timestamp: new Date().toISOString(),
    });
  }

  @SubscribeMessage('incrementCounter')
  async handleIncrementCounter(): Promise<void> {
    const counter = await this.counterService.incrementCounter();

    // Broadcast updated counter to all clients
    this.server.emit('counterUpdated', counter);
  }
}
