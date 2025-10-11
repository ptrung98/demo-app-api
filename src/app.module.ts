import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { StoreService } from './modules/store/store.service';
import { StoreController } from './modules/store/store.controller';
import { PrismaService } from './database/prisma/prisma.service';

@Module({
  imports: [
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'assets'),
      serveRoot: '/assets',
    }),
  ],
  controllers: [AppController, StoreController],
  providers: [AppService, StoreService, PrismaService],
})
export class AppModule {}
