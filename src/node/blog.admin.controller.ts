import { Controller, Post, Put, Body, Session } from '@malagu/mvc/lib/node';
import { Autowired } from '@malagu/core';
import { Transactional } from '@malagu/typeorm/lib/node';
import { DouMiBlog } from '../common/blog-protocol';
import { BlogServiceSymbol, BlogService } from './services/blog.service';
import { Article } from './entity/article';

// 以下api都是需要身份校验
@Controller('/api')
export class BlogAdminController {

  @Autowired(BlogServiceSymbol)
  protected readonly blogService: BlogService;

  // 新建博客
  @Post('/blog')
  @Transactional()
  async createBlog(
  @Body() article: DouMiBlog.ArticleDetail,
    @Session() session: any,
  ) {

    const userInfo = session['malagu:securityContext'].authentication.principal;
    const { username } = userInfo;

    const result = await this.blogService.createOrUpdateArticle(article, username);

    return { status: 1, data: {
      msg: article.articleStatus === 'draft' ? '保存草稿成功' : '发布成功',
      slug: (result as Article).slug
    }};
  }

  // 更新博客内容
  @Put('/blog')
  @Transactional()
  async updateBlog(
  @Body() article: DouMiBlog.ArticleDetail,
    @Session() session: any,
  ) {
    const userInfo = session['malagu:securityContext'].authentication.principal;
    const { username } = userInfo;

    await this.blogService.createOrUpdateArticle(article, username, true);

    return { status: 1, data: {
      msg: article.articleStatus === 'draft' ? '更新草稿成功' : '更新发布成功'
    }};
  }
}
