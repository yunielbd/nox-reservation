import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'common/dto/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'common/util/common.constants';

@Injectable()
export class RestaurantsService {

  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>
  ){}

  create(createRestaurantDto: CreateRestaurantDto) {
    const restaurant = this.restaurantRepository.create(createRestaurantDto);
    return this.restaurantRepository.save(restaurant);
  }

  /**
   * Retrieves a paginated list of restaurants.
   * 
   * @param paginationDto - An object containing pagination parameters.
   * @param paginationDto.limit - The maximum number of restaurants to return.
   * @param paginationDto.offset - The number of restaurants to skip before starting to collect the result set.
   * 
   * @returns A promise that resolves to an array of Restaurant entities.
   */
  findAll(paginationDto: PaginationDto) {
    const {limit,offset} = paginationDto;

    return this.restaurantRepository.find({
      skip:offset,
      take: limit ?? DEFAULT_PAGE_SIZE.RESTAURANT,
    });
  }


  async findOne(id: number) {
    const restaurant = await this.restaurantRepository.findOneBy({id});
    // return !restaurant ? throw new NotFoundException('this restaurant was not found') : restaurant;
    if(!restaurant){
      throw new NotFoundException('this restaurant was not found')
    }
    return restaurant
  }

  async update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    const restaurant = await this.restaurantRepository.preload({
      id,
      ...updateRestaurantDto
    });
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }
    return this.restaurantRepository.save(restaurant);
  }

  async remove(id: number) {
    const restaurant = await this.findOne(id)
    return this.restaurantRepository.remove(restaurant)
  }
}
