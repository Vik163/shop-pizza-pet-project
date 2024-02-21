import { Inject, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { User, UserDocument } from '../user/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/user/dto/user.dto';
import { v4 as uuidv4 } from 'uuid';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { SessionsService } from './sessions.service';
import { TokensService } from './tokens.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModal: Model<UserDocument>,
    private readonly sesionsService: SessionsService,
    private readonly tokensService: TokensService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // отбирает данные пользователя для клиента ===================
  private selectDataUsers(user: UserDto) {
    return {
      _id: user._id,
      phoneNumber: user.phoneNumber,
      birthday: user.birthday,
      name: user.name,
      email: user.email,
    };
  }

  // получаем пользователя по id или возвращаем "не найден"
  // получаем время хранения =====================================================
  async getInitialUserById(
    id: string,
    req: Request,
    res: Response,
  ): Promise<void> {
    const user: UserDto = await this.userModal.findById(id);

    if (user) {
      const tokens = await this.tokensService.getTokens(
        user._id,
        user.phoneNumber,
      );

      const timeToken = this.tokensService.handleTimeToken(
        user.refreshTokenData.createToken,
      );
      // время вышло => обновляем токен в БД и отправляем токены в куки
      if (timeToken > process.env.TIME_REFRESH - 2) {
        await this.tokensService.updateRefreshToken(user, tokens.refreshToken);
        this.tokensService.sendTokens(res, tokens);
      } else {
        // время не вышло отправляю в куки accessToken
        res.cookie('accessToken', tokens.accessToken, { secure: true });
      }

      // отбираю нужные данные пользователя для клиента, создаю сессию и отправляю на фронт
      const selectedUserData: UserDto = this.selectDataUsers(user);
      this.sesionsService.handleSession(req, res, selectedUserData);
      res.send(selectedUserData);
    } else {
      // throw new UnauthorizedException('Пользователь не найден');
      res.send({ message: 'Пользователь не найден' });
    }
  }

  // Определить пользователя
  // Ищем в БД, если нет создаем
  // устанавливаем токены и сессию ===========================================
  async handleUser(
    userRequest: UserDto,
    req: Request,
    res: Response,
    yaProvider?: boolean,
  ): Promise<AuthDto> {
    let userData: AuthDto;

    // проверяем существующего пользователя по телефону в БД
    let user: UserDto = await this.userModal.findOne({
      phoneNumber: userRequest.phoneNumber,
    });

    // Если пользователь есть, генерируем токены, обновляем в БД токен
    if (user) {
      const tokens = await this.tokensService.getTokens(
        user._id,
        user.phoneNumber,
      );
      await this.tokensService.updateRefreshToken(user, tokens.refreshToken);

      // отбираю нужные данные пользователя для клиента и создаю сессию отправляю на фронт
      const selectedUserData: UserDto = this.selectDataUsers(user);
      user = selectedUserData;
      userData = { user, tokens };
      this.sesionsService.handleSession(req, res, selectedUserData, yaProvider);

      // Если пользователя нет создаем все
    } else {
      const newUserData: AuthDto = await this.createUser(userRequest);

      if (newUserData.user) {
        // отбираю нужные данные пользователя для клиента и создаю сессию отправляю на фронт
        const selectedUserData: UserDto = this.selectDataUsers(
          newUserData.user,
        );
        newUserData.user = selectedUserData;
        userData = newUserData;

        this.sesionsService.handleSession(
          req,
          res,
          selectedUserData,
          yaProvider,
        );
      }
    }

    // Возвращаем токены и пользователя
    return userData;
  }

  // Создание пользователя =====================================================
  private async createUser(user: UserDto): Promise<AuthDto> {
    // Добавляем в БД доп. инфо
    user._id = uuidv4();
    user.createDate = new Date();

    // генерирую токены
    const tokens = await this.tokensService.getTokens(
      user._id,
      user.phoneNumber,
    );

    // хешируем refresh и создаем user.refreshTokenData для БД
    const hashedRefreshToken = await this.tokensService.hashData(
      tokens.refreshToken,
    );
    user.refreshTokenData = {
      refreshToken: hashedRefreshToken,
      createToken: new Date(),
    };

    const newUser: UserDocument = new this.userModal(user);

    const userDto: UserDto = await newUser.save();

    return { user: userDto, tokens };
  }

  // Выход ===================================================================
  async signout(res: Response) {
    res.clearCookie('__Host-psifi.x-csrf-token');
    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
    res.send({ status: 'success' });
  }
}
