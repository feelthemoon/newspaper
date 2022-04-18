import { Currency } from './models/currency.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { User } from './models/user.model';
import { AuthorizationModule } from './authorization/authorization.module';
import { UserModule } from './user/user.module';
import { Article } from './models/article.model';
import { ArticleModule } from './article/article.module';
import { ScheduleModule } from '@nestjs/schedule';
import { RedisModule } from 'nestjs-redis';
import { StatisticModule } from './statistic/statistic.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PG_HOST,
      port: +process.env.PG_PORT,
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB_NAME,
      autoLoadModels: true,
      models: [User, Article, Currency],
    }),
    ScheduleModule.forRoot(),
    RedisModule.register({
      name: 'cache',
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
      db: parseInt(process.env.REDIS_DB),
      password: process.env.REDIS_PASSWORD,
    }),
    AuthorizationModule,
    UserModule,
    ArticleModule,
    StatisticModule,
  ],
})
export class AppModule {}
