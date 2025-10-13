import { Controller } from '@nestjs/common';
import { createBaseController } from 'src/common/base/base.controller';
import { OrderService } from './order.service';
import { Order } from '@prisma/client';
import { PolicyService } from '../policy/policy.service';

@Controller('orders')
export class OrderController extends createBaseController<Order>(OrderService, 'orders') {
  constructor(protected readonly orderService: OrderService,
    protected readonly policyService: PolicyService
  ) {
    super(orderService)
  }
}
