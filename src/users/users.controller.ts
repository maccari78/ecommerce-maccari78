import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserSignInDto } from './dto/user-signin.dto';
import { UserEntity } from './entities/user.entity';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { Roles } from 'src/utility/common/user-roles.enum';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('signup')
  @ApiResponse({ status: 201, description: 'User successfully sign up' })
  async signup(@Body() userSignUpDto: UserSignUpDto): Promise<{ user: UserEntity }> {
    return { user: await this.usersService.signup(userSignUpDto) }
  }

  @Post('signin')
  @ApiResponse({ status: 201, description: 'User successfully sign in' })
  async signin(@Body() userSignInDto: UserSignInDto): Promise<{ accessToken: string; user: UserEntity; iat: string; exp: string; }> {
    const user = await this.usersService.signin(userSignInDto);
    const { token, iat, exp } = await this.usersService.accessToken(user);
    return { accessToken: token, user, iat, exp };
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Get('me')
  getProfile(@CurrentUser() currentUser: UserEntity) {
    return currentUser
  }

  @Get('all')
  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN, Roles.SUPERADMIN]))
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Users list' })
  async findAll(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @Get('single/:id')
  @ApiResponse({ status: 201, description: 'User found by ID' })
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'User successfully updated' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return await this.usersService.update(id, updateUserDto);
  }

  @Patch('role/:id')
  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.SUPERADMIN]))
  @ApiBearerAuth()
  async updateRole(@Param('id') userId: string, @Body('role') newRole: Roles) {
    return await this.usersService.updateRole(userId, newRole);
  }

  @Delete(':id')
  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN, Roles.SUPERADMIN]))
  @ApiBearerAuth()
  async remove(@Param('id') id: string, @CurrentUser() currentUser: UserEntity): Promise<{ message: string }> {
    const user = await this.usersService.findOne(id);
    if (!user) throw new NotFoundException('User not found');

    if (user.role === Roles.SUPERADMIN && currentUser.role !== Roles.SUPERADMIN) {
      throw new ForbiddenException('Only a superAdmin can delete a superAdmin');
    }

    await this.usersService.remove(id);
    return { message: 'User successfully deleted' };
  }
}
