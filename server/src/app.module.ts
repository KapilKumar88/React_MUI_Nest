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
import jwtConfig from './config/jwt.config';

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
  ],
  controllers: [AppController],
  providers: [AppService, UserService, UniqueEmailValidation],
})
export class AppModule {}
