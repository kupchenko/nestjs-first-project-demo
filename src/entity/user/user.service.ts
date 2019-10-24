import {Inject, Injectable} from '@nestjs/common';
import {User} from './user.entity';
import {UserProviders} from './user.providers';

@Injectable()
export class UserService {

    constructor(@Inject(UserProviders.USER) private readonly userRepository: typeof User) {

    }

    async getUser(id: string): Promise<User> {
        return this.userRepository.findByPk(id, {attributes: ['id', 'name']});
    }

    async getUsers(): Promise<User[]> {
        return this.userRepository.findAll<User>({where: {id: 1}});
    }
}
