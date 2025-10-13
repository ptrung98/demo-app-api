import { Controller, Get } from '@nestjs/common';
import { createBaseController } from 'src/common/base/base.controller';
import { PolicyService } from './policy.service';

@Controller('policies')
export class PolicyController extends createBaseController(
  PolicyService,
  'policy',
) { }
