import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { StoreService } from './modules/store/store.service';
import { StoreController } from './modules/store/store.controller';
import { PrismaService } from './database/prisma/prisma.service';
import { OrderController } from './modules/order/order.controller';
import { OrderService } from './modules/order/order.service';
import { PolicyController } from './modules/policy/policy.controller';
import { PolicyService } from './modules/policy/policy.service';
import { TimeController } from './modules/time/time.controller';

@Module({
  imports: [
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'assets'),
      serveRoot: '/assets',
    }),
  ],
  controllers: [AppController, StoreController, OrderController, PolicyController, TimeController],
  providers: [AppService, StoreService, PrismaService, OrderService, PolicyService],
})
export class AppModule { }
