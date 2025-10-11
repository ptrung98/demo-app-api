import { Controller, Get } from '@nestjs/common';
import { Store } from '@prisma/client';
import { BaseController } from 'src/common/base/base.controller';
import { StoreService } from './store.service';

@Controller('stores')
export class StoreController extends BaseController<Store> {
  constructor(protected readonly storeService: StoreService) {
    super(storeService);
  }

}
