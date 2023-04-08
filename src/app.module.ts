import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { CartsModule } from './carts/carts.module';

@Module({
  imports: [ProductModule, PrismaModule, UsersModule, CartsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
