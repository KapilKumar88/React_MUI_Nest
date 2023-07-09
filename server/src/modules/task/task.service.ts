import { Injectable } from '@nestjs/common';
import { Task, User } from '@prisma/client';
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

  findAll(authUser: User) {
    return this.prismaService.task.findMany({
      where: {
        userId: authUser.userId,
      },
    });
  }

  update(data: UpdateTaskDto) {
    return this.prismaService.task.update({
      where: {
        taskId: data.taskId,
      },
      data: {
        taskName: data.taskName,
        taskDescription: data.taskDescription,
        status: data.status,
        completedDate: data?.completedDate,
      },
    });
  }

  remove(id: number) {
    return this.prismaService.task.delete({
      where: {
        taskId: id,
      },
    });
  }
}
