import * as React from 'react'
import * as query from 'query-string';
import { Autorpc } from '@malagu/rpc/lib/common/annotation/detached';
import { BlogServer, DouMiBlog } from '../common/blog-protocol';
import * as InfiniteScroll from 'react-infinite-scroller';
import BlogContainer from './components/blogContainer';
import { View } from '@malagu/react/lib/browser';
import BlogItem from './components/blogItem';

import './styles/blog.list.less';

interface Prop {}
interface State {
  blogList: {title: string, digest: string, slug: string, illustration: string}[],
  pageCount: number,
  currentPage: number,
  isOpenSnackbar: boolean,
  snackbarMsg: string,
}

@View('/blog/list')
export default class BlogList extends React.Component<Prop, State> {

  @Autorpc(BlogServer)
  protected BlogServer!: BlogServer;

  constructor(prop: Prop) {
    super(prop);
    this.state = {
      blogList: [],
      pageCount: 1,
      currentPage: 1,
      isOpenSnackbar: false,
      snackbarMsg: '',
    };
  }

  async componentDidMount() {
    await this.fetchBlogList(this.state.currentPage)
  }
  fetchBlogList = async (currentPage: number) => {
    try {
      const { queryTag, queryArch, queryCat } = query.parse((this.props as any).location.search)
      let queryCondition: DouMiBlog.queryCondition = { articleStatus: 'published' }
      if (queryTag) {
        queryCondition = { ...queryCondition, queryTag: +queryTag }
      }
      if (queryArch) {
        queryCondition = { ...queryCondition, queryArch: +queryArch }
      }
      if (queryCat) {
        queryCondition = { ...queryCondition, queryCat: +queryCat }
      }
      const { blogList } = this.state
      const result = await this.BlogServer.fetchArticleList(currentPage, queryCondition)

      this.setState({
        blogList: [...blogList, ...result.list],
        pageCount: result.pageCount,
        currentPage: result.currentPage,
      })
    } catch (err) {
      console.log(err)
      this.setState({
        isOpenSnackbar: true,
        snackbarMsg: '获取列表失败，请稍后重试',
      })
    }
  }
  loadMore = async () => {
    const { currentPage } = this.state;

    await this.fetchBlogList(+currentPage + 1)
  }
  renderBlogItem = () => {
    const { blogList } = this.state

    return blogList.map(item => (
      <BlogItem
        key={item.slug}
        title={item.title}
        mediaUrl={item.illustration}
        slug={item.slug}
        digest={item.digest} />
    ))
  }

  render() {
    const { currentPage, pageCount, isOpenSnackbar, snackbarMsg } = this.state;
    return(
      <BlogContainer
        contentClass="blog-list-wrapper"
        isOpenSnackbar={isOpenSnackbar}
        snackbarMsg={snackbarMsg}
      >
        <section className="blog-list-container">
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadMore}
            hasMore={currentPage < pageCount}
            loader={<div className="loader" key={0}>努力加载中 ...</div>}
            useWindow={false}
          >
            {this.renderBlogItem()}
          </InfiniteScroll>
          </section>
      </BlogContainer>
    )
  }
}
