import { Injectable } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { LoginDto, UserDto } from 'src/auth/dto/auth.dto';
import { Repository } from 'typeorm';
import { TaskStatusEnum } from 'src/shared/constants';
import { SuccessResponse } from 'src/shared/responses/success';
import { ObjectId } from 'mongodb';
import { ErrorResponse } from 'src/shared/responses/error';

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
    creator: new ObjectId(userId),
    dueDate: new Date(dueDate)
  })

  return SuccessResponse(201, 'task creation successful...', taskEnt, null)

  }

  async findAll(userId: string) {
    const tasks = await this.taskRepo.find({ where: { creator: new ObjectId(userId) } })
    if(tasks.length == 0) {
      return ErrorResponse(404, 'no task yet created by user', null, null)
    }
    return SuccessResponse(200, 'all tasks now retrieved...', tasks, null)
  }

  async retrieveTask(taskId: string) {

    const task = await this.taskRepo.findOneBy({ _id: new ObjectId(taskId), })
    if(!task) {
      return ErrorResponse(404, 'Oops! task not found...', null, null)
    }

    if(task.isDeleted) {
      return ErrorResponse(400, 'task already deleted', null, null)
    }
    return SuccessResponse(200, 'task retrieved successfully', task, null)
  }

  async update(userId: string, taskId: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepo.findOneBy({_id: new ObjectId (taskId) })
    if(!task) {
      return ErrorResponse(404, 'task not found...', null, null)
    }

    if(task.creator.toString() !== userId) {
      return ErrorResponse(400, 'unauthorized to perform action', null, null)
    }

    Object.assign(task, updateTaskDto)
   
    return SuccessResponse(200, 'task update successful',  await this.taskRepo.save(task), null )
  }

  async remove(taskId: string) {
    try {
    const task = await this.taskRepo.findOneBy({_id: new ObjectId(taskId)})
    if(!task) {
      return ErrorResponse(404, 'task not found', null, null)
    }

    await this.taskRepo.delete(new ObjectId(taskId))
    return SuccessResponse(200, 'task deleted successfully', null, null)
    } catch {
      return ErrorResponse(400, 'unable to delete task', null, null)
    }
   
  }
}
