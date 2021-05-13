import {Controller, Request, Post, UseGuards, Body, Get, Param, HttpCode} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './auth/dto/login-user.dto';
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {MessagesService} from "./messages/messages.service";

@Controller()
export class AppController {
    constructor(private authService: AuthService, private messagesService: MessagesService) {}

    @ApiTags('Login')
    @HttpCode(200)
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto, @Request() req) {
        return this.authService.login(req.user);
    }

    @ApiTags('Profile')
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @ApiTags('Chats')
    @UseGuards(JwtAuthGuard)
    @Get('chats')
    getChats(@Request() req) {
        return this.messagesService.findChats(req.user.id);
    }

    @ApiTags('Messages')
    @UseGuards(JwtAuthGuard)
    @Get('chats/:id')
    getMessages(@Request() req, @Param() param) {
        return this.messagesService.findMessages(req.user.id, param.id);
    }

}
