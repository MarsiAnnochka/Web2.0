import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from './entities/messages.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Messages) private readonly messagesRepository: Repository<Messages>,
    private jwtService: JwtService
  ) {}

  async findOne(username: string): Promise<Messages | undefined> {
    return this.messagesRepository.findOne({
      where: {
        name: username,
      },
    });
  }
  async findAll(): Promise<Messages[]> {
    return this.messagesRepository.find();
  }

  async createMessage(createMessageDto: CreateMessageDto) {
    const message = new Messages;
    message.from = createMessageDto.from;
    message.to= createMessageDto.to;
    message.payload = createMessageDto.payload;
    await this.messagesRepository.save(message);
    const payload = { };
    return {
      type: "success",
      message:
          {
             token: this.jwtService.sign(payload)
          }
    };
  }
}
