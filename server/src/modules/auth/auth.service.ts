import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ApiResponse } from '../../types/api-response.type';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(data: RegisterDto): Promise<ApiResponse> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(data.password, salt);
    
    await this.userService.createUser({
      name: data.name,
      email: data.email,
      password: hash,
    });

    return {
      success: true,
      message: 'Registered successfully.',
    };
  }
}
