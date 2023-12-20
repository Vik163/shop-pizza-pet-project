import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/decorators/auth.decorator';
// import { Csrf } from 'src/decorators/csrf.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  // @Auth('ADMIN')
  // @Csrf()
  getUser() {
    console.log('User');

    return this.userService.getUser();
  }
  // @Get(':id')
  // // @Auth('ADMIN')
  // getUserById(
  //   @Param('id') id: string,
  //   @Req() req: Request,
  //   @Res() res: Response,
  // ) {
  //   return this.userService.getUserById(id, req, res);
  // }

  // @Post()
  // signup(@Body() userRequest: UserDto) {
  //   return this.userService.createUser(userRequest);
  // }
}
