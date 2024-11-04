import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { IdDto } from 'common/dto/id.dto';
import { PaginationDto } from 'common/dto/pagination.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Client } from './entities/client.entity';

@Controller('api/clients')
@ApiTags('Clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiOperation({summary: 'Create a new client' })
  @ApiCreatedResponse({description: 'A new client has been created', type: CreateClientDto})
  @ApiBadRequestResponse({description: 'Bad request data, check the request data carefully', type: BadRequestException})
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

/**
 * Retrieves a paginated list of all clients.
 * 
 * @param paginationDto - An object containing pagination parameters.
 * @param paginationDto.page - The page number to retrieve.
 * @param paginationDto.limit - The number of items per page.
 * 
 * @returns A promise that resolves to a paginated list of clients.
 */
@Get()
@ApiOperation({summary: 'Get a paginated list of clients' })
findAll(@Query() paginationDto: PaginationDto) {
  return this.clientsService.findAll(paginationDto);
}


  @Get(':id')
  @ApiOperation({summary: 'Find a client by ID'  })
  @ApiResponse({description: 'Client found', type: Client})
  findOne(@Param() {id}: IdDto) {
    return this.clientsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update a client by ID'  })
  update(@Param() {id}: IdDto, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete a client by ID'  })
  remove(@Param() {id}: IdDto) {
    return this.clientsService.remove(id);
  }
}
