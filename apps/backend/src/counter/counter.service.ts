import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CounterService {
  constructor(private prisma: PrismaService) {}

  async getCounter() {
    let counter = await this.prisma.counter.findUnique({
      where: { id: 1 },
    });

    if (!counter) {
      counter = await this.prisma.counter.create({
        data: { id: 1, value: 0 },
      });
    }

    return counter;
  }

  async incrementCounter() {
    return this.prisma.counter.upsert({
      where: { id: 1 },
      update: {
        value: {
          increment: 1,
        },
      },
      create: {
        id: 1,
        value: 1,
      },
    });
  }
}
