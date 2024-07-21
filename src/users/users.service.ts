import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserSignUpDto } from './dto/user-signup.dto';
import { hash, compare } from 'bcrypt';
import { UserSignInDto } from './dto/user-signin.dto';
import { sign } from 'jsonwebtoken';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/utility/common/user-roles.enum';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) { }

  async signup(userSignUpDto: UserSignUpDto): Promise<UserEntity> {
    const userExists = await this.findUserByEmail(userSignUpDto.email)
    if (userExists) throw new BadRequestException('Email is not available')
    userSignUpDto.password = await hash(userSignUpDto.password, 10)
    let user = this.usersRepository.create(userSignUpDto)
    user = await this.usersRepository.save(user)
    delete user.password
    return user
  }

  async signin(userSignInDto: UserSignInDto) {
    const userExists = await this.usersRepository.createQueryBuilder('users').addSelect('users.password').where('users.email=:email', { email: userSignInDto.email }).getOne()
    if (!userExists) throw new BadRequestException('Bad credentials')
    const matchPassword = await compare(userSignInDto.password, userExists.password)
    if (!matchPassword) throw new BadRequestException('Bad credentials')
    delete userExists.password
    return userExists
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({ id })
    if (!user) throw new NotFoundException('User not found')
    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({ id })
    if (!user) throw new NotFoundException('User not found');

    if (updateUserDto.name) {
      user.name = updateUserDto.name;
    }

    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }

    return await this.usersRepository.save(user);
  }

  async updateRole(userId: string, newRole: Roles): Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    user.roles = [newRole];
    return await this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.usersRepository.findOneBy({ id })
    if (!user) throw new NotFoundException('User not found');
    await this.usersRepository.remove(user);
  }

  async findUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email })
  }

  async accessToken(user: UserEntity): Promise<{ token: string; iat: string; exp: string }> {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + parseInt(process.env.ACCESS_TOKEN_EXPIRE_TIME, 10) * 60;

    const token = sign({ id: user.id, email: user.email, iat, exp }, process.env.ACCESS_TOKEN_SECRET_KEY);

    return {
      token,
      iat: new Date(iat * 1000).toISOString(),
      exp: new Date(exp * 1000).toISOString(),
    };
  }
}
