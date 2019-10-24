import {Controller, Get, Param} from '@nestjs/common';
import {UserService} from './user.service';
import {User} from './user.entity';

@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get()
    async getUsers(): Promise<User[]> {
      return await this.userService.getUsers();
    }

    @Get('/:id')
    async getUser(@Param('id') id): Promise<User> {
        return await this.userService.getUser(id);
    }
}
