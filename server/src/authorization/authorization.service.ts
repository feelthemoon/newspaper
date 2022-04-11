import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthorizationDto } from './authorization.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthorizationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signin(user: AuthorizationDto) {
    const foundUser = await this.userService.findBy('email', user.email);
    const exception = new HttpException(
      JSON.stringify({
        email_or_password_invalid: 'Неверный email и/или пароль',
      }),
      HttpStatus.BAD_REQUEST,
    );

    if (!foundUser) {
      throw exception;
    }

    const passwordCompares = await bcrypt.compare(
      user.password,
      foundUser.password,
    );

    if (!passwordCompares) {
      throw exception;
    }
    const expiresIn = user.rememberMe ? '72h' : '24h';

    return this.jwtService.sign({ id: foundUser.id }, {expiresIn});
  }
  async signup(user: AuthorizationDto) {
    const emailBusy = await this.userService.findBy('email', user.email);
    if (emailBusy) {
      throw new HttpException(
        JSON.stringify({
          email_busy: 'Этот email уже используется',
        }),
        400,
      );
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const createdUser = await this.userService.create({
      ...user,
      password: hashedPassword,
    });
    return this.jwtService.sign({ id: createdUser.id });
  }
}
