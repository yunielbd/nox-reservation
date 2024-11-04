import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Client } from 'clients/entities/client.entity';
import { Restaurant } from 'restaurant/entities/restaurant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Client, Restaurant])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
