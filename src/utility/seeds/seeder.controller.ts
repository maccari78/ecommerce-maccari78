import { Controller, Get, UseGuards } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from '../guards/authentication.guard';
import { AuthorizeGuard } from '../guards/authorization.guard';
import { Roles } from '../common/user-roles.enum';

@ApiTags('seeders')
@Controller('seeders')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Get('seed')
  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Seed categories, products & users' })
  async seedData() {
    await this.seederService.seed();
    return { message: 'Seed data successfully executed.' };
  }
}

