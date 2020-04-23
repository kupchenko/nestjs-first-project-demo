import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {

  constructor(@InjectModel(User) private readonly userRepository: typeof User) {
  }

  async finaById(id: string): Promise<User> {
    return this.userRepository.findByPk(id, { attributes: ['id', 'username'] });
  }

  async findAll(): Promise<{ users: User[] }> {
    return { users: await this.userRepository.findAll<User>() };
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();

    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.age = createUserDto.age;

    return this.userRepository.create<User>(user);
  }
}
