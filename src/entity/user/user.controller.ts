import {BadRequestException, Body, Controller, Get, HttpStatus, Param, Post, Res} from '@nestjs/common';
import {UserService} from './user.service';
import {User} from './user.entity';
import {CreateUserDto} from './dto/create-user.dto';

@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get()
    getUsers(): Promise<{ users: User[] }> {
        return this.userService.findAll();
    }

    @Get('/:id')
    async getUser(@Param('id') id, @Res() res) {
        const user: User = await this.userService.finaById(id);
        if (user === undefined || user == null) {
            res.status(HttpStatus.NOT_FOUND).send();
            throw new BadRequestException('Invalid user');
        }
        res.status(HttpStatus.OK).json(user).send();
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.createUser(createUserDto);
    }
}
