import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get('users')
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @HttpCode(200)
  @Post('signup')
  async newUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
