import { Body, Controller, Get, HttpCode, Post, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get('users')
  async getAllUsers(): Promise<any> {
    return this.usersService.findAll();
  }

  @HttpCode(200)
  @Post('signup')
  async newUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }
}
