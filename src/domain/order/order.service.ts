import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'clients/entities/client.entity';
import { Repository } from 'typeorm';
import { Restaurant } from 'restaurant/entities/restaurant.entity';
import { Order } from './entities/order.entity';
import { RegistryDates } from 'common/embedded/registry-dates.embedded';
import { OrderStatus } from './enums/order-status.enum';
import { PaginationDto } from 'common/dto/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'common/util/common.constants';
import { verify } from 'crypto';

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ){}
  
  async create(createOrderDto: CreateOrderDto) {
    const clientAndRest = await this.findClientAndRestaurant(createOrderDto);
    const{client} = clientAndRest
    const{restaurant} = clientAndRest
    const { id:clientId } = clientAndRest.client;
    const { id:restaurantId } = clientAndRest.restaurant;
    this.updateRestaurantClients(restaurant,client);

    const saveOrder = this.orderRepository.create({
      clientId: clientId,
      restaurantId: restaurantId,
      description: createOrderDto.description,
      client: client,
      restaurant: restaurant,
    });

    return this.orderRepository.save(saveOrder);

  }
  private async findClientAndRestaurant(createOrderDto: CreateOrderDto) {
    const { id: clientId } = createOrderDto.clientId;
    const client = await this.clientRepository.findOneBy({ id: clientId });
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    const { id: restaurantId } = createOrderDto.restaurantId;
    // const restaurant = await this.restaurantRepository.findOneBy({ id: restaurantId });
    const restaurant = await this.restaurantRepository.findOne({
      where: { id:restaurantId },
      relations: {
        clients: true,
      }
    });
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }
    return { client, restaurant };
  }


  findAll(paginationDto: PaginationDto) {
    const {limit,offset} = paginationDto;

    return this.orderRepository.find({
      skip:offset,
      take: limit ?? DEFAULT_PAGE_SIZE.ORDER,
    });
  }

  async findOne(clientId: number,restaurantId: number) {
    const order = await this.orderRepository.findOneBy({clientId,restaurantId});
    if(!order){
      throw new NotFoundException('this order was not found')
    }
    return order
  }

  async update(updateOrderDto: UpdateOrderDto) {
    const clientId = updateOrderDto.clientId.id;
    const { id: restaurantId } = updateOrderDto.restaurantId;
    let order = await this.orderRepository.findOne({
      where:{
        clientId: clientId,
        restaurantId: restaurantId
      }
    });
    if (!order) throw new NotFoundException('This order does not exist');
    order.description = updateOrderDto.description;
    return this.orderRepository.save(order);

  }

  remove(id: number) {
    return `No remove implemanation for this action,
     an order is only removed if the client or restaurant disapears,
     A logical deletion can be added here using the status property`;
  }

  /**
   * Updates the list of clients for a restaurant by adding a new client 
   * if not already present and the restaurant is not full.
   * 
   * @param restaurant - The restaurant object to update.
   * @param client - The client object to potentially add to the restaurant's client list.
   * @returns void - This function doesn't return anything, it updates the restaurant object directly.
   */
  private updateRestaurantClients(restaurant: Restaurant, client: Client) {
    if (!restaurant.clients.some((c) => c.id === client.id)) {
      if (restaurant.clients.length >= restaurant.capacity) {
        throw new ConflictException('This restaurant is full an no longer taking clients')
      }
      restaurant.clients.push(client);
    }
    this.restaurantRepository.save(restaurant);
  }

}


