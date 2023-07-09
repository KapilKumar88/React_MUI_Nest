import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ApiResponse } from '../../types/api-response.type';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

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

  async login(data: LoginDto): Promise<ApiResponse> {
    const user = await this.userService.findUserByEmail(data.email);
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.jwtService.signAsync({ sub: user.userId });

    return {
      success: true,
      message: 'Login successful',
      data: {
        accessToken: accessToken,
        userDetails: {
          name: user.name,
          email: user.email,
        },
      },
    };
  }
}
