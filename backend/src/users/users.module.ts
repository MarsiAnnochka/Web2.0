import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import {PassportModule} from "@nestjs/passport";
import {ConfigModule} from "@nestjs/config";
import {JwtModule} from "@nestjs/jwt";
import {LocalStrategy} from "../auth/local.strategy";
import {JwtStrategy} from "../auth/jwt.strategy";
import {AuthService} from "../auth/auth.service";

@Module({
  imports: [
      TypeOrmModule.forFeature([Users]),
    UsersModule,
    PassportModule,
    ConfigModule.forRoot({ isGlobal: true}),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: process.env.EXPIRESIN },
    })
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, LocalStrategy, JwtStrategy],
  exports: [UsersService]
})
export class UsersModule {}
