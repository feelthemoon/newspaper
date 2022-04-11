import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthorizationDto } from './authorization.dto';
import { Response } from 'express';
import { AuthorizationService } from './authorization.service';

@Controller()
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @Post('/signin')
  async signin(@Body() reqBody: AuthorizationDto, @Res() res: Response) {
    try {
      const token = await this.authorizationService.signin(reqBody);
      res.setHeader('Access-Control-Expose-Headers', 'Authorization');
      res.setHeader('Authorization', token);
      res.status(200).send({}).json();
    } catch (e) {
      res.status(e.status || 500).send(e);
    }
  }

  @Post('/signup')
  async signup(@Body() reqBody: AuthorizationDto, @Res() res: Response) {
    try {
      const token = await this.authorizationService.signup(reqBody);
      res.setHeader('Access-Control-Expose-Headers', 'Authorization');
      res.setHeader('Authorization', token);
      res.status(200).send({}).json();
    } catch (e) {
      res.status(e.status || 500).send(e);
    }
  }
}
