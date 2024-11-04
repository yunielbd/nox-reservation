import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { IdDto } from 'common/dto/id.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { PaginationDto } from 'common/dto/pagination.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation(
    {summary: 
      'Create a new order, validating both client and restaurant existance '+
      'also checking the restaurant availability. '+
      'if capacity is not exceeded, '+
      'updates the list of clients for a restaurant by adding a new client '+ 
      'if not already present'
     })  // Operation description  
  @ApiCreatedResponse({description: 'A new order has been created', type: CreateOrderDto})
  @ApiBadRequestResponse({description: 'Bad request data, check the request data carefully', type: BadRequestException})
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @ApiOperation(
    {summary: 'Get a paginated list of all orders, '+
      'including client and restaurant details'})  // Operation description
  findAll(@Query() paginationDto: PaginationDto) {
    return this.orderService.findAll(paginationDto);
  }


  @Get(':id/:id')
  @ApiOperation(
    {summary: 'Get an order by client and restaurant ids, '+
      'including client and restaurant details'})  // Operation description
  findOne(@Param() {id:clientId}: IdDto,@Param() {id:restaurantId}: IdDto) {
    return this.orderService.findOne(clientId,restaurantId);
  }

  @Patch(':id')
  @ApiOperation(
    {summary: 'Update an order by its id, '+
      'including client and restaurant details'})  // Operation description
  update(@Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation(
    {summary: 'Remove an order by its id'})  // Operation description
  remove(@Param() {id}: IdDto) {
    return this.orderService.remove(id);
  }
}
