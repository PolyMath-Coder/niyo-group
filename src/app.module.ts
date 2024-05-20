import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { UserEntity } from './shared/entities.ts/user.entity';
import { TasksModule } from './tasks/tasks.module';
import { TaskEntity } from './tasks/entities/task.entity';
import { EventsModule } from './events/events.module';

config()
@Module({
  imports: [AuthModule, TypeOrmModule.forRoot({type: 'mongodb', url: process.env.DB_URL, useNewUrlParser: true, useUnifiedTopology: true, synchronize: true, autoLoadEntities: true}), TypeOrmModule.forFeature([UserEntity, TaskEntity]), TasksModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
