import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect(); // Kết nối database khi module khởi tạo
  }

  async onModuleDestroy() {
    await this.$disconnect(); // Ngắt kết nối khi app shutdown
  }
}
