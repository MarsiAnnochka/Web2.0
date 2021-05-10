import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messages } from './entities/messages.entity';
import {PassportModule} from "@nestjs/passport";
import {ConfigModule} from "@nestjs/config";
import {JwtModule} from "@nestjs/jwt";
import {LocalStrategy} from "../auth/local.strategy";
import {JwtStrategy} from "../auth/jwt.strategy";
import {AuthService} from "../auth/auth.service";

@Module({
  imports: [
      TypeOrmModule.forFeature([Messages]),
    MessagesModule,
    PassportModule,
    ConfigModule.forRoot({ isGlobal: true}),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: process.env.EXPIRESIN },
    })
  ],
  controllers: [MessagesController],
  providers: [MessagesService, JwtStrategy],
  exports: [MessagesService]
})
export class MessagesModule {}
