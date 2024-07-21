import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Roles } from '../common/user-roles.enum';

@Injectable()
export class UsersSeeder {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
    ) { }

    async seed() {
        const usersData = [
            {
                name: "Correo1",
                email: "correo1@gmail.com",
                password: "Correo1",
                birthdate: new Date("1900-01-01"),
                roles: [Roles.USER],
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ];

        for (const userData of usersData) {
            const existingUser = await this.usersRepository.findOne({ where: { email: userData.email } });

            if (!existingUser) {
                await this.usersRepository.save(userData);
            }
        }
    }
}