import { Cron } from '@nestjs/schedule';
import { Currency } from './../models/currency.model';
import { StatisticWeatherDto } from './statistic.weather.dto';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { InjectModel } from '@nestjs/sequelize';
import { LoggerService } from 'src/utils/logger.service';

@Injectable()
export class StatisticService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly httpService: HttpService,
    @InjectModel(Currency) private readonly currencyRepository: typeof Currency,
  ) {}

  @Cron('0 */1 * * */1')
  async updateCurrencyCourse() {
    try {
      const { USD, EUR } = await this.getCurrency();

      await Promise.all([
        this.currencyRepository.create({
          currencyName: 'USD',
          currencyValue: USD,
        }),
        this.currencyRepository.create({
          currencyName: 'EUR',
          currencyValue: EUR,
        }),
      ]);

      await this.loggerService.logToFile(
        'CURRENCY CHANGE LOADED',
        './logs/currency.cron.log',
      );
    } catch (error) {
      await this.loggerService.logToFile(error, './logs/currency.cron.log');
    }
  }

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

  async getWeather(geoObj: StatisticWeatherDto): Promise<any> {
    const res = await lastValueFrom(
      this.httpService.get(
        `${process.env.WEATHER_API_LINK}?lat=${geoObj.lat}&lon=${geoObj.lon}&appid=${process.env.WEATHER_API_KEY}&lang=ru`,
      ),
    );
    return res.data;
  }
}
