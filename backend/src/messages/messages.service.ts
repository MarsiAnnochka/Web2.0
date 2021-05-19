import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from './entities/messages.entity';
import {Repository, SelectQueryBuilder} from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter'
import {MessageCreatedEvent} from "./events/message-created.event";

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Messages) private readonly messagesRepository: Repository<Messages>,
    private jwtService: JwtService,
    private eventEmitter: EventEmitter2
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

  async findAll() {
    const mes = await this.messagesRepository
        .createQueryBuilder("messages")
        .select("payload")
        //.select('"from", "payload", "date"')
        .orderBy("date")
        .limit(10)
        .getRawMany();
    const result = [];
    mes.map((message)=>{
      /*const obj = {
        payload: message.payload,
        from: message.from,
        date: message.date
      }
      result.push(obj);
       */
      result.push(message.payload)
    })
    return {
      type: "success",
      sms_array: result
    }
    //this.messagesRepository.find();
  }

  async createMessage(createMessageDto: CreateMessageDto) {
    const message = new Messages;
    //message.from = createMessageDto.from;
    //message.to= createMessageDto.to;
    message.from = 1;
    message.to = 2;
    message.payload = createMessageDto.payload;
    await this.messagesRepository.save(message);
    /*
    return {
      type: "success",
      message:
          {
            from: message.from,
            to: message.to,
            payload: message.payload
          }
    };
     */
  }

  async getMessage(message: string){
    return {message: message}
  }

}
