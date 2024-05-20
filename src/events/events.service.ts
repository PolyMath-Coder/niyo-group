import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/tasks/entities/task.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/shared/entities.ts/user.entity';

@Injectable()
export class EventsService {
  constructor(@InjectRepository(TaskEntity) private readonly taskRepo: Repository<TaskEntity>,
              @InjectRepository(UserEntity)  private readonly userRepo: Repository<UserEntity>            
) {}
 async streamTaskData() {
  const tasks = await this.taskRepo.find()
  console.log(tasks)
  }

  async streamAllUsers() {
    const users = await this.userRepo.find()
    return users
  }

}
