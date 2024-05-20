import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsGateway } from './events.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from 'src/tasks/entities/task.entity';
import { UserEntity } from 'src/shared/entities.ts/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, UserEntity])],
  providers: [EventsGateway, EventsService],
})
export class EventsModule {}
