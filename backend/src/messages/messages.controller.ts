import {Body, Controller, Get, HttpCode, Post, Req, Request, Res, Response} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ApiTags } from '@nestjs/swagger';
import {MessageCreatedEvent} from "./events/message-created.event";
import {JwtService} from "@nestjs/jwt";
import { EventEmitter2 } from '@nestjs/event-emitter';

@ApiTags('Message')
@Controller()
export class MessagesController {
  constructor(private readonly messagesService: MessagesService, private eventEmitter: EventEmitter2) {
  }

  @ApiTags('Get all messages')
  @Get('messages')
  async getAllMessages() {
    return this.messagesService.findAll();
  }

  @ApiTags('Post message')
  @Post('new-message')
  async newMessage(@Body() createMessageDto: CreateMessageDto, @Res() response: Response) {
    await this.messagesService.createMessage(createMessageDto);
    const messageCreatedEvent = new MessageCreatedEvent();
    messageCreatedEvent.message = createMessageDto.payload;
    this.eventEmitter.emit('message.created', messageCreatedEvent);
  }

  @ApiTags('Get message')
  @Get('get-message')
  async handleEvent(@Req() request: Request){
    this.eventEmitter.on('message.created', (messageCreatedEvent)=>{
      return messageCreatedEvent.message;
    })
  }
}
