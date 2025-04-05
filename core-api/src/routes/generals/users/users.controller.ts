import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from '../../../services/users/application/users.service';
import { CheckDuplicatedEmail, SignUpDto } from './dto';
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
  @HttpCode(HttpStatus.OK)
  @Post('/check')
  async checkEmail(@Body() checkDuplicatedEmail: CheckDuplicatedEmail) {
    const body = checkDuplicatedEmail;
    const data = await this.usersService.checkDuplicatedEmail(body);

    return { data };
  }

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
