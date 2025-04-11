import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from '../../../services/users/application/users.service';
import { SignUpDto } from './dto';
import { Public } from '@libs/decorators';
import { AsyncContext, AsyncContextKey } from '@libs/async-context';
import { User } from '../../../services/users/domain/users.entity';

@Controller('/users')
export class GeneralsUsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly context: AsyncContext
  ) {}

  @Public()
  @Post('/sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    const body = signUpDto;

    await this.usersService.signUp(body);
  }

  @Get('/self')
  getSelf() {
    const user = this.context.get<User>(AsyncContextKey.USER);

    return { data: user };
  }
}
