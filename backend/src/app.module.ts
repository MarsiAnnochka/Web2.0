import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, UsersModule],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
