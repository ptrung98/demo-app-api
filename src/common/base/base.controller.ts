import {
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { BaseService } from './base.service';
import { ResponseDto } from './base.dto';

export class BaseController<T> {
  constructor(protected readonly service: BaseService<T>) {}

  @Get()
  async findAll(): Promise<ResponseDto<T[]>> {
    const data = await this.service.findAll();
    return { success: true, data };
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ResponseDto<T>> {
    const item = await this.service.findOne(id);
    if (!item) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    return { success: true, data: item };
  }

  @Post()
  async create(@Body() dto: any): Promise<ResponseDto<T>> {
    const data = await this.service.create(dto);
    return { success: true, data };
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: any): Promise<ResponseDto<T>> {
    const data = await this.service.update(id, dto);
    return { success: true, data };
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<ResponseDto<void>> {
    await this.service.remove(id);
    return { success: true, message: 'Deleted successfully' };
  }
}
