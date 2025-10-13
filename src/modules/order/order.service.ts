import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrderService extends BaseService<Order> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, prisma.order);
  }

  override async create(dto: Order) {
    const policy = await this.prisma.policy.findFirst();
    dto.fee = policy?.fee || 0;
    return super.create(dto);
  }
}
