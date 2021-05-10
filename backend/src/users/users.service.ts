import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly usersRepository: Repository<Users>,
    private jwtService: JwtService
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
    const user = new Users;
    user.name = createUserDto.username;
    user.first_name = createUserDto.first_name;
    user.last_name = createUserDto.last_name;
    user.email = createUserDto.email;
    user.city = createUserDto.city;
    user.password = await bcrypt.hash(createUserDto.password,10);
    await this.usersRepository.save(user);
    const payload = { username: user.name, sub: user.id };
    return {
      type: "success",
      message:
          {
             token: this.jwtService.sign(payload)
          }
    };
  }
}
