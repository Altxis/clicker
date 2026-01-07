import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CounterService {
  constructor(private prisma: PrismaService) {}

  async getCounter() {
    return this.prisma.counter.findUnique({
      where: { id: 1 },
    });
  }

  async incrementCounter() {
    return this.prisma.counter.update({
      where: { id: 1 },
      data: {
        value: {
          increment: 1,
        },
      },
    });
  }
}
