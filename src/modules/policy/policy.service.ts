import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Policy } from '@prisma/client';

@Injectable()
export class PolicyService extends BaseService<Policy> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, prisma.policy);
  }
}
