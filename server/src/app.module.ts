import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import appConfig from './config/app.config';
import { UniqueEmailValidation } from './customer_validation/unique_email_validation.rule';
import { AuthModule } from './modules/auth/auth.module';
import { UserService } from './modules/user/user.service';
import { TaskModule } from './modules/task/task.module';
import jwtConfig from './config/jwt.config';
import { TaskService } from './modules/task/task.service';
import { ValidTaskId } from './customer_validation/valid_task_id.rule copy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, jwtConfig],
    }),
    PrismaModule,
    UserModule,
    AuthModule,
    JwtModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserService,
    TaskService,
    ValidTaskId,
    UniqueEmailValidation,
  ],
})
export class AppModule {}
