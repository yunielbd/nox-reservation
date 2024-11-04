import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { EnvModule } from './env/env.module';
import { ClientsModule } from 'clients/clients.module';
import { OrderModule } from './domain/order/order.module';
import { RestaurantModule } from './domain/restaurant/restaurant.module';

@Module({
  imports: [ClientsModule, CommonModule, DatabaseModule, EnvModule, OrderModule, RestaurantModule],
})
export class AppModule {}
