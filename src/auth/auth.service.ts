import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const isPasswordValid = await bcrypt.compare(pass, user.password_hash);
      if (isPasswordValid) return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.email, sub: user.id, role: user.role };
    const access_token = this.jwtService.sign(payload);

    // Remove sensitive information from user object
    const { password_hash, ...userDetails } = user;

    return {
      access_token,
      user: userDetails,
    };
  }

  async verifyRole(userId: number, roles: string[]): Promise<boolean> {
    const user = await this.usersService.findById(userId);
    return roles.includes(user.role.name);
  }
}
