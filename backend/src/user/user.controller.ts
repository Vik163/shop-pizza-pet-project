import { Body, Controller, Get, Param, Put, Req } from '@nestjs/common';
import { UserService } from './user.service';
// import { Auth } from 'src/decorators/auth.decorator';
import { UserDto } from './dto/user.dto';
import { AccessToken } from 'src/common/decorators/accessToken.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  // защитник
  @AccessToken()
  getUsers(): Promise<UserDto[]> {
    return this.userService.getUsers();
  }

  @Put(':id')
  updateUserData(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateUserDto: UserDto,
  ) {
    return this.userService.updateUserData(id, updateUserDto);
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
