import { Controller, Get, Post } from '@nestjs/common';
import { CounterService } from './counter.service';

@Controller('counter')
export class CounterController {
  constructor(private readonly counterService: CounterService) {}

  @Get()
  async getCounter() {
    return this.counterService.getCounter();
  }

  @Post('increment')
  async incrementCounter() {
    return this.counterService.incrementCounter();
  }
}
