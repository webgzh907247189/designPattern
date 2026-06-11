import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticleService {
  getArticleName() {
    return '---- 我是 ArticleService 的 name (服务注入于服务)';
  }
}
