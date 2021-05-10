import { Body, Controller, Get, HttpCode, Post, Request } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Message')
@Controller()
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {
  }

  @Get('messages')
  async getAllMessages() {
    return this.messagesService.findAll();
  }

  @HttpCode(200)
  @Post('newmessage')
  async newUser(@Body() createMessageDto: CreateMessageDto) {
    return await this.messagesService.createMessage(createMessageDto);
  }
}
