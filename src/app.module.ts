import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';

config()
@Module({
  imports: [AuthModule, TypeOrmModule.forRoot({type: 'mongodb', url: process.env.DB_URL})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
