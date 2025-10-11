import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Store } from '@prisma/client';

@Injectable()
export class StoreService extends BaseService<Store> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, prisma.store);
  }
}
