import { Injectable } from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  create(payload: CreateTaskDto, userId: number): Promise<Task> {
    return this.prismaService.task.create({
      data: {
        taskName: payload.taskName,
        taskDescription: payload.taskDescription,
        status: payload.status,
        user: {
          connect: {
            userId: userId,
          },
        },
      },
    });
  }

  taskExists(id: number): Promise<number> {
    return this.prismaService.task.count({
      where: {
        taskId: id,
      },
    });
  }

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return this.prismaService.task.delete({
      where: {
        taskId: id,
      },
    });
  }
}
