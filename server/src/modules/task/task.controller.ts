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
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
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
