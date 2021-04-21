import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AppGateway } from './app.gateway';
import {ConfigModule} from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forRoot(), ConfigModule.forRoot({ isGlobal: true}), AuthModule, UsersModule],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
