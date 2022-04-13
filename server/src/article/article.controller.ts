import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ArticleService } from './article.service';

@Controller('api/v1/articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('/latest/:page')
  async getLatestNews(@Req() req: Request, @Res() res: Response) {
    try {
      const articles = await this.articleService.getLatestNews(
        +req.params.page,
      );
      res.status(200).send(articles);
    } catch (e) {
      res.status(500).send({ unknown: e });
    }
  }
}
