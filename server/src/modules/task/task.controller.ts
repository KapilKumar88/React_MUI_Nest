import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';
import { User } from '@prisma/client';
import { AuthenticatedUser } from '../../decorator/authenticated-user/authenticated-user.decorator';
import { ApiResponse } from 'src/types/api-response.type';
import { DeleteTaskDto } from './dto/delete-task.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @AuthenticatedUser() authUser: User,
  ): Promise<ApiResponse> {
    await this.taskService.create(createTaskDto, authUser.userId);
    return {
      success: true,
      message: 'Task created successfully',
    };
  }

  @Get()
  async findAll(@AuthenticatedUser() authUser: User) {
    const result = await this.taskService.findAll(authUser);
    return {
      success: true,
      message: 'Task fetched successfully',
      data: result,
    };
  }

  @Patch()
  async update(@Body() updateTaskDto: UpdateTaskDto): Promise<ApiResponse> {
    await this.taskService.update(updateTaskDto);
    return {
      success: true,
      message: 'Task details updated successfully.',
    };
  }

  @Delete(':id')
  async remove(@Param() params: DeleteTaskDto): Promise<ApiResponse> {
    await this.taskService.remove(+params.id);
    return {
      success: true,
      message: 'Task deleted successfully',
    };
  }
}
