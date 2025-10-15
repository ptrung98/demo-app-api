import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Order, OrderStatus } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrderService extends BaseService<Order> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, prisma.order);
  }

  override async create(dto: Order) {
    const generateOrderCode = () => {
      const now = new Date();
      const datePart = now.toISOString().slice(0, 10).replace(/-/g, '');
      const random = uuidv4().split('-')[0].toUpperCase();
      return `${datePart}-${random}`;
    };

    const policy = await this.prisma.policy.findFirst();
    dto.fee = policy?.fee || 0;
    dto.uid = generateOrderCode();
    return super.create(dto);
  }

  async returnRentedItem(orderId: string) {
    const data = await this.prisma.order.update({
      where: { id: orderId },
      data: {
        status: OrderStatus.RETURNED
      }
    })

    //todo return money update status to complete
    return data
  }
}
