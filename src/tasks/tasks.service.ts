import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { LoginDto, UserDto } from 'src/auth/dto/auth.dto';
import { Repository } from 'typeorm';
import { TaskStatusEnum } from 'src/shared/constants';
import { SuccessResponse } from 'src/shared/responses/success';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity) private readonly taskRepo: Repository<TaskEntity>
  ) {}
  async create(userId: string, createTaskDto: CreateTaskDto) {
    const { title, description, category, priority, dueDate, attachment } = createTaskDto
    
    
  const taskEnt = await this.taskRepo.save({
    title,
    description,
    category,
    status: TaskStatusEnum.TODO,
    priority,
    attachment,
    creator: userId,
    dueDate: new Date(dueDate)
  })

  return SuccessResponse(201, 'task creation successful...', taskEnt, null)

  }

  findAll() {
    return `This action returns all tasks`;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} task`;
  // }

  // update(id: number, updateTaskDto: UpdateTaskDto) {
  //   return `This action updates a #${id} task`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} task`;
  // }
}
