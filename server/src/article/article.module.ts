import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Article } from '../models/article.model';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [SequelizeModule.forFeature([Article]), HttpModule],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
