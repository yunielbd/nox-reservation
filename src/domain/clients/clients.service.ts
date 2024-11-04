import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'common/dto/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'common/util/common.constants';

@Injectable()
export class ClientsService {

  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>
  ){}

  create(createClientDto: CreateClientDto) {
    const client = this.clientRepository.create(createClientDto);
    return this.clientRepository.save(client);
  }

  findAll(paginationDto: PaginationDto) {
    const {limit,offset} = paginationDto;

    return this.clientRepository.find({
      skip:offset,
      take: limit ?? DEFAULT_PAGE_SIZE.CLIENT,
    });
  }

  async findOne(id: number) {
    const client = await this.clientRepository.findOneBy({id});
    if(!client){
      throw new NotFoundException('this client was not found')
    }
    return client
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const client = await this.clientRepository.preload({
      id,
      ...updateClientDto
    });
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return this.clientRepository.save(client);
  }

  async remove(id: number) {
    const client = await this.findOne(id)
    return this.clientRepository.remove(client)
  }
}
