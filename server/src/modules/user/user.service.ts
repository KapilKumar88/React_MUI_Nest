import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  /**
   * Check if the given email id already exists in the database or not
   * for the validation of unique email
   * @param email
   * @returns boolean
   */
  async emailExists(email: string): Promise<number> {
    return this.prisma.user.count({
      where: {
        email: email,
      },
    });
  }

  /**
   * Create new user in the database
   * @param payload Prisma.UserCreateInput
   * @returns Promise<User>
   */
  createUser(payload: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: payload.password,
      },
    });
  }

  findUserByEmail(email: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  findUserById(id: number): Promise<User> {
    return this.prisma.user.findFirst({
      where: {
        userId: id,
      },
    });
  }
}
