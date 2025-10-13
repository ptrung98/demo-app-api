import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class BaseService<TModel> {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly modelDelegate: any,
  ) {}

  async findAll(): Promise<TModel[]> {
    return this.modelDelegate.findMany();
  }

  async findOne(id: number): Promise<TModel> {
    return this.modelDelegate.findUnique({ where: { id } });
  }

  async create(data: any): Promise<TModel> {
    return this.modelDelegate.create({ data });
  }

  async update(id: number, data: any): Promise<TModel> {
    return this.modelDelegate.update({ where: { id }, data });
  }

  async remove(id: number): Promise<TModel> {
    return this.modelDelegate.delete({ where: { id } });
  }
}
