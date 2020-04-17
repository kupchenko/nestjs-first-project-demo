import { Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../user/dto/user.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AuthService {
  private saltRounds: number = 10;

  constructor(@InjectModel(User) private readonly userRepository: typeof User) {
  }

  logout() {
    return undefined;
  }

  login(loginUserDto: LoginUserDto) {
    return undefined;
  }

  async register(user: User) {
    const { password, salt } = this.hashPassword(user.password);
    user.password = password;
    user.salt = salt;
    console.log(`${user.email}, ${user.username}`);
    const savedUser = await user.save();
    // const savedUser = await user.save();
    return this.mapUserToUserDto(savedUser);
  }

  private mapUserToUserDto(user: User): UserDto {
    const register = new UserDto();

    register.username = user.username;
    register.password = user.password;
    register.email = user.email;

    return register;
  }

  private hashPassword(rawPassword: string): any {
    const salt = bcrypt.genSaltSync(this.saltRounds);
    const password = bcrypt.hashSync(rawPassword, salt);
    return {
      password,
      salt,
    };
  }
}
