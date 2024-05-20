import { Controller, Get, Post, Body, Req, Res, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/task.dto';
import { TaskRoute } from 'src/shared/constants';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller(TaskRoute.TASKS)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post(TaskRoute.CREATE)
  async createTask(@Req() req, @Body() createTaskDto: CreateTaskDto, @Res() res) {
    // console.log(req.user, createTaskDto)
    // console.log(createTaskDto)
  const response = await this.tasksService.create(req.user, createTaskDto);
  res.status(response.responseCode).json(response)
}

  @Get(TaskRoute.TASKS)
  findAll() {
    return this.tasksService.findAll();
  }

  // @Get(TaskRoute.SINGLE_TASK)
  // findOne(@Param('taskId') taskId: string) {
  //   return this.tasksService.findOne(taskId);
  // }

  // @Patch(TaskRoute.SINGLE_TASK)
  // update(@Param('taskId') taskId: string, @Body() updateTaskDto: UpdateTaskDto) {
  //   return this.tasksService.update(+id, updateTaskDto);
  // }

  // @Delete(TaskRoute.SINGLE_TASK)
  // remove(@Param('taskId') taskId: string) {
  //   return this.tasksService.remove(+id);
  // }
}
