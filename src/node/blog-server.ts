import { BlogServer, DouMiBlog } from '../common/blog-protocol';
import { Rpc } from '@malagu/rpc';
import { Anonymous } from '@malagu/security/lib/node';
import { Autowired } from '@malagu/core';
import { Transactional } from '@malagu/typeorm/lib/node';
import { BlogServiceSymbol, BlogService } from './services';
import { AuthServiceSymbol, AuthService } from './services/auth.service';
import { WebsiteServiceSymbol, WebsiteService } from './services/website.service';


const pick = require('lodash.pick');

@Rpc(BlogServer)
@Anonymous()
export class BlogServerImpl implements BlogServer {

  @Autowired(AuthServiceSymbol)
  protected readonly authService: AuthService;

  @Autowired(BlogServiceSymbol)
  protected readonly blogService: BlogService;

  @Autowired(WebsiteServiceSymbol)
  protected readonly websiteService: WebsiteService;

  @Transactional()
  async fetchHottestArticles(limit: number): Promise<DouMiBlog.ArticleList> {
    const result = await this.blogService.fetchArticleList(1, limit, {
      pv: 'DESC'
    })

    result.list = result.list.map(item => pick(item, ['title', 'slug', 'archiveTime']))

    return Promise.resolve(result)
  }

  // TODO: fix the pipeManager bug
  @Transactional()
  async fetchArticleList(currentPage: number, condition?: DouMiBlog.queryCondition): Promise<DouMiBlog.ArticleList> {
    const result = await this.blogService.fetchArticleList(currentPage, 20, null, condition)

    result.list = result.list.map(item => pick(item, ['title', 'slug', 'archiveTime', 'digest', 'illustration', 'author', 'tags', 'category', 'articleStatus']))

    return Promise.resolve(result)
  }

  @Transactional()
  async fetchArticleDetail(slug: string, shouldBeUpdateStats = false): Promise<DouMiBlog.ArticleDetail> {
    const result = await this.blogService.fetchArticleDetail(slug, shouldBeUpdateStats)

    return Promise.resolve(result);
  }

  @Transactional()
  async findArticlesByKeyword(keyword: string): Promise<DouMiBlog.ArticleBrief[]> {
    const result = await this.blogService.searchArticleByKeyword(keyword);

    const list = result.map(item => pick(item, ['title', 'slug']))

    return Promise.resolve(list);
  }

  @Transactional()
  async fetchTagsList(): Promise<DouMiBlog.TagsItem[]> {
    const result = await this.blogService.fetchTagsListWithArticle();

    return Promise.resolve(result)
  }
  @Transactional()
  async fetchCatsList(): Promise<DouMiBlog.CategoryItem[]> {
    const result = await this.blogService.fetchCatListWithArticle();

    return Promise.resolve(result)
  }

  @Transactional()
  async fetchArchsList(): Promise<DouMiBlog.ArchiveItem[]> {
    const result = await this.blogService.fetchArchListWithArticle()

    return Promise.resolve(result)
  }

  @Transactional()
  async fetchWebsiteChangeLog() {
    const result = await this.websiteService.websiteChangeLog()

    return Promise.resolve(result.reverse());
  }

  @Transactional()
  async registerUser(param: DouMiBlog.RegisterParam): Promise<string> {
    await this.authService.registerUser(param);
    return Promise.resolve('注册成功');
  }
}
