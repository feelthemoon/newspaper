import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { StatisticService } from './statistic.service';

@Controller('api/v1/statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}
  @Get('/currency')
  async getCurrency(@Req() req: Request, @Res() res: Response) {
    try {
      const currency = await this.statisticService.getCurrency();

      res.status(200).send(currency);
    } catch (error) {
      res.status(500).send({ message: JSON.stringify({ unknown: error }) });
    }
  }
}
