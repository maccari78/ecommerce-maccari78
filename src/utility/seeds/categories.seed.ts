import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from 'src/categories/entities/category.entity';

@Injectable()
export class CategoriesSeeder {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoriesRepository: Repository<CategoryEntity>,
    ) { }

    async seed() {
        const categoriesData = [
            {
                title: "keyboard",
                description: "all",
                addedById: "422a976a-0b85-49b3-afc1-f41faecc5259",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "mouse",
                description: "all",
                addedById: "422a976a-0b85-49b3-afc1-f41faecc5259",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "monitor",
                description: "all",
                addedById: "422a976a-0b85-49b3-afc1-f41faecc5259",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "smartphone",
                description: "all",
                addedById: "422a976a-0b85-49b3-afc1-f41faecc5259",
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ];

        for (const categoryData of categoriesData) {
            const existingCategory = await this.categoriesRepository.findOne({
                where: { title: categoryData.title },
            });

            if (!existingCategory) {
                await this.categoriesRepository.save(categoryData);
            }
        }
    }
}