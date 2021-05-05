import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly usersRepository: Repository<Users>,
  ) {}

  async findOne(username: string): Promise<Users | undefined> {
    return this.usersRepository.findOne({
      where: {
        name: username,
      },
    });
  }
  async findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async createUser(createUserDto: CreateUserDto) {
    /*
    try {
      const user = await this.usersRepository.create(createUserDto);
      user.password = await bcrypt.hash(user.password,10);
      await this.usersRepository.save(user);
    }
    catch (e) {
      return {
        statusCode: 500,
        message: ['Something went wrong!'],
        error: 'Bad Request',
      }
    }
    return {
      statusCode: 200,
      message: ['User created!'],
    };*/
    console.log(createUserDto);
    const user = new Users;
    user.name = createUserDto.username;
    user.first_name = createUserDto.first_name;
    user.last_name = createUserDto.last_name;
    user.email = createUserDto.email;
    user.city = createUserDto.city;
    user.password = await bcrypt.hash(createUserDto.password,10);
    await this.usersRepository.save(user);
    return {
      statusCode: 200,
      message: ['User created!'],
    };
  }
}
