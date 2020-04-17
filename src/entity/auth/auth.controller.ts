import { Body, Controller, Post, Put } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from '../user/user.entity';
import { UserDto } from '../user/dto/user.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Put('/login')
  login(@Body() loginUserDto: LoginUserDto): Promise<User> {
    return this.authService.login(loginUserDto);
  }

  @Put('/logout')
  async logout(): Promise<User> {
    return this.authService.logout();
  }

  @Post('/register')
  // @UsePipes(new JoiValidationPipe(createCatSchema))
  register(@Body() registerUserDto: RegisterUserDto): Promise<UserDto> {
    const user: User = this.mapRegisterUserDtoToUser(registerUserDto);
    return this.authService.register(user);
  }

  private mapRegisterUserDtoToUser(registerUserDto: RegisterUserDto): User {
    const user = new User();

    user.username = registerUserDto.username;
    user.email = registerUserDto.email;
    user.password = registerUserDto.password;

    return user;
  }
}
