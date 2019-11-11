import {Inject, Injectable} from '@nestjs/common';
import {User} from './user.entity';
import {UserProviders} from './user.providers';
import {CreateUserDto} from './dto/create-user.dto';

@Injectable()
export class UserService {

    constructor(@Inject(UserProviders.USER) private readonly userRepository: typeof User) {
    }

    async finaById(id: string): Promise<User> {
        // this.userRepository.findAll<User>({where: {id: 1}});
        return this.userRepository.findByPk(id, {attributes: ['id', 'name']});
    }

    async findAll(): Promise<{ users: User[] }> {
        return {users: await this.userRepository.findAll<User>()};
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = new User();
        user.name = createUserDto.name;
        user.age = createUserDto.age;

        return user.save();
    }
}
