import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AppGateway } from './app.gateway';
import {ConfigModule} from '@nestjs/config';
import {MessagesModule} from "./messages/messages.module";
import {AppController} from "./app.controller";

@Module({
  imports: [TypeOrmModule.forRoot(), ConfigModule.forRoot({ isGlobal: true}), AuthModule, UsersModule, MessagesModule],
  controllers: [AppController],
  providers: [AppGateway],
})
export class AppModule {}
