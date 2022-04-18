import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Article } from '../models/article.model';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { RedisService } from 'nestjs-redis';
import { Cron } from '@nestjs/schedule';
import { Op } from 'sequelize';
import { LoggerService } from '../utils/logger.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article) private readonly articleRepository: typeof Article,
    private readonly httpService: HttpService,
    private readonly redisService: RedisService,
    private readonly loggerService: LoggerService,
  ) {}
  @Cron('*/1 1-5,13-19 * * */1')
  async localizeArticles() {
    try {
      const redisClient = await this.redisService.getClient('cache');
      let page = await redisClient.get('page');
      if (!page) {
        await redisClient.set('page', 1);
      }

      const tasks = [];
      const articles = await this.loadArticles(+page);

      for (const art of articles.data.news) {
        tasks.push(
          this.articleRepository.create({
            title: art.title,
            description: art.description,
            imgSrc: art.image,
            categories: [...art.category, 'any'],
            remoteUrl: art.url,
            publishedDate: new Date(art.published).toISOString(),
            author: art.author,
          }),
        );
      }
      await Promise.all(tasks);
      await redisClient.set('page', parseInt(page) + 1);
      await this.loggerService.logToFile(
        'NEW DATA HAS BEEN INSERTED',
        './logs/article.cron.log',
      );
    } catch (e) {
      await this.loggerService.logToFile(e, './logs/article.cron.log');
    }
  }
  @Cron('2 5,18 * * */1')
  async defaultParsingPage() {
    const redisClient = await this.redisService.getClient('cache');
    await redisClient.set('page', 1);
  }

  findBy(field, value) {
    return this.articleRepository.findOne({ where: { [field]: value } });
  }
  getLatestNews(page: number, category: string) {
    return this.articleRepository.findAll({
      where: {
        categories: {
          [Op.contains]: [category],
        },
      },
      raw: true,
      order: [['publishedDate', 'DESC']],
      limit: 30,
      offset: (page - 1) * 30,
    });
  }

  destroyBy(field, value) {
    return this.articleRepository.destroy({ where: { [field]: value } });
  }

  loadArticles(page: number, page_size = 300, language = 'ru'): any {
    const res = this.httpService.get(
      `${process.env.NEWS_API_LINK}search?domain_not=graniru.org&page_number=${page}&page_size=${page_size}&language=${language}&apiKey=${process.env.NEWS_API_KEY}`,
      { responseType: 'json' },
    );
    return lastValueFrom(res);
  }
}
