import { Controller, Get } from '@nestjs/common';
import { createBaseController } from 'src/common/base/base.controller';
import { StoreService } from './store.service';

@Controller('stores')
export class StoreController extends createBaseController(
  StoreService,
  'stores',
) {}
