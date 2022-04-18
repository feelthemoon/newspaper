import { Currency } from './../models/currency.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';
import { LoggerService } from 'src/utils/logger.service';

@Module({
  imports: [SequelizeModule.forFeature([Currency]), HttpModule],
  controllers: [StatisticController],
  providers: [StatisticService, LoggerService],
})
export class StatisticModule {}
