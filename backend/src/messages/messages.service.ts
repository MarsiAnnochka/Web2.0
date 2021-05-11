import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from './entities/messages.entity';
import {Repository, SelectQueryBuilder} from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Messages) private readonly messagesRepository: Repository<Messages>,
    private jwtService: JwtService
  ) {}

  async findChats(user: number): Promise<SelectQueryBuilder<Messages>> {
    return this.messagesRepository
        .createQueryBuilder("messages")
        .select("DISTINCT to")
        .where("messages.from = :id", {id: user});
  }

  async findMessages(firstId: number, secondId: number): Promise<SelectQueryBuilder<Messages>> {
    return this.messagesRepository
        .createQueryBuilder("messages")
        .where("messages.from = :id1 AND messages.to = :id2", {id1: firstId, id2: secondId})
        .orWhere("messages.from = :id3 AND messages.to = :id4", {id4: firstId, id3: secondId})
        .orderBy("date")
        .limit(10);
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
    return {
      type: "success",
      message:
          {
            from: message.from,
            to: message.to,
            payload: message.payload
          }
    };
  }

}
