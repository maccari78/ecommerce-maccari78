import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { ReviewEntity } from './entities/review.entity';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';
import { Roles } from 'src/utility/common/user-roles.enum';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateReviewDto } from './dto/update-review.dto';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) { }

  @Post()
  @UseGuards(AuthenticationGuard)
  @ApiResponse({ status: 201, description: 'Review successfully created' })
  async create(@Body() createReviewDto: CreateReviewDto, @CurrentUser() currentUser: UserEntity): Promise<ReviewEntity> {
    return await this.reviewsService.create(createReviewDto, currentUser);
  }

  @Get('/all')
  @ApiResponse({ status: 201, description: 'Reviews list' })
  async findAll(): Promise<ReviewEntity[]> {
      return await this.reviewsService.findAll();
  }

  @Get('/:productId')
  @ApiResponse({ status: 201, description: 'Review found by product ID' })
  async findAllByProduct(@Param('productId') productId: string) {
    return await this.reviewsService.findAllByProduct(productId?.toString())
  }

  @Get(':id')
  @ApiResponse({ status: 201, description: 'Review found by ID ' })
  async findOne(@Param('id') id: string): Promise<ReviewEntity> {
    return await this.reviewsService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 201, description: 'Review has been successfully updated' })
  async update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto): Promise<ReviewEntity> {
    return this.reviewsService.update(id, updateReviewDto);
  }

  @Delete(':id')
  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Review successfully deleted' })
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(id);
  }
}
