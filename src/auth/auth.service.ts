import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

interface UserDocument {
  _id: unknown;
  email: string;
  password?: string;
  name?: string;
  role?: string;
  is_first_login?: boolean;
  level?: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  async login(email: string, password: string) {
    const users = (await this.usersService.findAll()) as UserDocument[];
    const user = users.find((u) => u.email === email);

    if (!user || !user.password) {
      throw new UnauthorizedException(
        'Tài khoản hoặc mật khẩu không chính xác!',
      );
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException(
        'Tài khoản hoặc mật khẩu không chính xác!',
      );
    }

    return {
      success: true,
      message: 'Login successfully',
      user: {
        _id: String(user._id),
        name: user.name ?? '',
        role: user.role ?? '',
        is_first_login: user.is_first_login ?? false,
        level: user.level ?? '',
      },
    };
  }
}
