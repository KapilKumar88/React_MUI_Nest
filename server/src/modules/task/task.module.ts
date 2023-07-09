import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
  imports: [JwtModule, UserModule, PrismaModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
