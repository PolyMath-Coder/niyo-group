import { Controller, Get, Post, Body, Req, Res, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { TaskRoute } from 'src/shared/constants';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller(TaskRoute.TASKS)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post(TaskRoute.CREATE)
  async createTask(@Req() req, @Body() createTaskDto: CreateTaskDto, @Res() res) {
  const response = await this.tasksService.create(req.user._id, createTaskDto);
  res.status(response.responseCode).json(response)
}

  @Get(TaskRoute.ALL)
  async findAll(@Req() req, @Res() res) {
    const response = await this.tasksService.findAll(req.user._id);
    res.status(response.responseCode).json(response)
  }

  @Get()
  async  retrieveTask(@Query('taskId') taskId: string, @Res() res) {
   const response = await this.tasksService.retrieveTask(taskId);
   res.status(response.responseCode).json(response)
  }

  @Patch(TaskRoute.SINGLE_TASK)
  async update(@Req() req, @Param('taskId') taskId: string, @Body() updateTaskDto: UpdateTaskDto, @Res() res) {
    const response = await this.tasksService.update(req.user._id, taskId, updateTaskDto);
    res.status(response.responseCode).json(response)
  }

  @Delete(TaskRoute.SINGLE_TASK)
  async removeTask(@Param('taskId') taskId: string, @Res() res) {
    const response = await this.tasksService.remove(taskId);
    res.status(response.responseCode).json(response)
  }
}
