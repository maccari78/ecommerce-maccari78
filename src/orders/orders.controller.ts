import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { OrderEntity } from './entities/order.entity';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';
import { Roles } from 'src/utility/common/user-roles.enum';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @UseGuards(AuthenticationGuard)
  @Post()
  @ApiResponse({ status: 201, description: 'Order successfully created' })
  async create(@Body() createOrderDto: CreateOrderDto, @CurrentUser() currentUser: UserEntity): Promise<OrderEntity> {
    return await this.ordersService.create(createOrderDto, currentUser);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Orders list' })
  async findAll(@CurrentUser() currentUser: UserEntity): Promise<OrderEntity[]> {
    return await this.ordersService.findAll(currentUser);
  }

  @Get(':id')
  @ApiResponse({ status: 201, description: 'Order found by ID ' })
  async findOne(@Param('id') id: string): Promise<OrderEntity> {
    return await this.ordersService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Order has been successfully updated' })
  async update(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
    @CurrentUser() currentUser: UserEntity) {
    return await this.ordersService.update(id, updateOrderStatusDto, currentUser);
  }

  @Put('cancel/:id')
  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Order has been successfully cancelled' })
  async cancelled(@Param('id') id: string, @CurrentUser() currentUser: UserEntity) {
    return await this.ordersService.cancelled(id, currentUser)
  }

  @Delete(':id')
  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Category successfully deleted' })
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
