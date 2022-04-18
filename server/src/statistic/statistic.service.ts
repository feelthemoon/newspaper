import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class StatisticService {
  constructor(private readonly httpService: HttpService) {}

  async getCurrency(): Promise<any> {
    const usdRes = await lastValueFrom(
      this.httpService.get(
        `${process.env.CURRENCY_API_LINK}USD-RUB/1?format=json`,
      ),
    );
    const eurRes = await lastValueFrom(
      this.httpService.get(
        `${process.env.CURRENCY_API_LINK}EUR-USD/1?format=json`,
      ),
    );

    return {
      USD: usdRes.data[0].bid,
      EUR: (eurRes.data[0].bid * usdRes.data[0].bid).toString(),
    };
  }
}
