import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(@InjectRepository(ReviewEntity)
  private readonly reviewRepository: Repository<ReviewEntity>,
    private readonly productService: ProductsService
  ) { }

  async create(createReviewDto: CreateReviewDto, currentUser: UserEntity): Promise<ReviewEntity> {
    const product = await this.productService.findOne(createReviewDto.productId.toString())
    let review = await this.findOneByUserAndProduct(+currentUser.id, createReviewDto.productId)
    if (!review) {
      review = this.reviewRepository.create(createReviewDto)
      review.user = currentUser
      review.product = product
    } else {
      review.comment = createReviewDto.comment,
        review.ratings = createReviewDto.ratings
    }
    return await this.reviewRepository.save(review)
  }

  async findAll(): Promise<ReviewEntity[]> {
    return await this.reviewRepository.find({
      relations: {
        user: true,
        product: {
          category: true
        }
      }
    });
  }

  async findAllByProduct(id: string): Promise<ReviewEntity[]> {
    // const product = await this.productService.findOne(id)
    return await this.reviewRepository.find({
      where: { product: { id } },
      relations: {
        user: true,
        product: {
          category: true
        }
      }
    })
  }

  async findOne(id: string): Promise<ReviewEntity> {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: {
        user: true,
        product: {
          category: true
        }
      }
    })
    if (!review) throw new NotFoundException('Review not found')
    return review;
  }

  async update(id: string, updateReviewDto: UpdateReviewDto): Promise<ReviewEntity> {
    const review = await this.reviewRepository.findOne({ where: { id } });
    if (!review) { throw new Error('Review not found'); }
    review.comment = updateReviewDto.comment;
    await this.reviewRepository.save(review);
    return review;
  }

  async remove(id: string) {
    const review = await this.findOne(id)
    return this.reviewRepository.remove(review)
  }

  async findOneByUserAndProduct(userId: number, productId: number) {
    return await this.reviewRepository.findOne({
      where: {
        user: { id: userId.toString() },
        product: { id: productId.toString() }
      },
      relations: {
        user: true,
        product: { category: true }
      }
    })
  }
}
