import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { CounterModule } from '../counter/counter.module';

@Module({
  imports: [CounterModule],
  providers: [EventsGateway],
})
export class EventsModule {}
