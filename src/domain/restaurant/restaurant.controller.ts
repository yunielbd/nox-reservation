import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { RestaurantsService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { PaginationDto } from 'common/dto/pagination.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { IdDto } from 'common/dto/id.dto';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantsService) {}

  @Post()
  @ApiOperation({summary: 'Create a new restaurant' })  // Operation description   // Operation description   // Operation description   // Operation description   // Operation description   // Operation description   // Operation description   //
  @ApiCreatedResponse({description: 'A new restaurant has been created', type: CreateRestaurantDto})
  @ApiBadRequestResponse({description: 'Bad request data, check the request data carefully', type: BadRequestException})
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.create(createRestaurantDto);
  }

  @Get()
  @ApiCreatedResponse({description: 'A paginated list of restaurants has been found', type: [CreateRestaurantDto]})  // Response description when a list of restaurants is found
  @ApiOperation({summary: 'Get a paginated list of all restaurants'})  // Operation description
  findAll(@Query() paginationDto: PaginationDto) {
    return this.restaurantService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiBadRequestResponse({description: 'Bad request data, check the request data carefully', type: BadRequestException})  // Bad request description
  @ApiCreatedResponse({description: 'A restaurant has been found', type: CreateRestaurantDto})  // Response description when a restaurant is found
  @ApiOperation({summary: 'Get a restaurant by ID'})  // Operation description
  findOne(@Param() {id}: IdDto) {
    return this.restaurantService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update a restaurant by ID'})  // Operation description  // Operation description  // Operation description  // Operation description  // Operation description  // Operation description  // Operation description  //
  @ApiBadRequestResponse({description: 'Bad request data, check the request data carefully', type: BadRequestException})  // Bad request description
  @ApiCreatedResponse({description: 'A restaurant has been updated', type: CreateRestaurantDto})  // Response description when a restaurant is updated
  update(@Param() {id}: IdDto, @Body() updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantService.update(id, updateRestaurantDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete a restaurant by ID'})  // Operation description  // Operation description  // Operation description  // Operation description  // Operation description  // Operation description  // Operation description  //
  @ApiBadRequestResponse({description: 'Bad request data, check the request data carefully', type: BadRequestException})  // Bad request description
  remove(@Param() {id}: IdDto) {
    return this.restaurantService.remove(id);
  }
}
