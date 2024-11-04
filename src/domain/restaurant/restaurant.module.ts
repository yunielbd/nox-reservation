import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant])],
  exports: [RestaurantsService],
  controllers: [RestaurantController],
  providers: [RestaurantsService],
})
export class RestaurantModule {}
