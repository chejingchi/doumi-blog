import * as React from 'react'
import { View } from '@malagu/react/lib/browser';
import BlogContainer from './components/blogContainer';
import Timeline from './components/timeline';
import Divider from '@material-ui/core/Divider';

interface Prop {}
interface State {
    response: string
}

const data = [
    {
        "title": "本站正式上线",
        "desc1": "8月8号，完成所有博客的基本功能，除了关于豆米的网页暂时没完成之外。",
        "desc2": "豆米的博客意在分享web开发的点点滴滴，前端和后台都会有所涉及，再适当分享些生活的精彩。",
        "date": "2016/08",
        "time": "08 周一"
    },
    {
        "title": "完成文章搜索功能",
        "desc1": "9月11号，完成网站的首页以及后台的文章搜索功能。",
        "desc2": "暂时只提供对博客的标题搜索，不支持全文搜索。",
        "date": "2016/09",
        "time": "11 周日"
    },
    {
        "title": "改进网站的SEO",
        "desc1": "10月10号，修改部分代码，增强网站的SEO。",
        "desc2": "修改页面的title、description等meta，提高网站的SEO。添加google的verification文件，提高谷歌收录网站的可能性",
        "date": "2016/10",
        "time": "10 周一"
    },
    {
        "title": "博文列表改版",
        "desc1": "12月03号，博文列表改版，使之更加简洁大方。",
        "desc2": "新增博客首页图片，方便显示博文列表中的大图,增加网站形象性",
        "date": "2016/12",
        "time": "03 周六"
    },
    {
        "title": "增加友情链接面板",
        "desc1": "01月05号，增加友情链接面板，加大文章标题的可存长度",
        "desc2": "新增博客的友情链接，外链到一些推荐的博客网站",
        "date": "2017/01",
        "time": "05 周四"
    },
    {
        "title": "优化管理后台和统计数据",
        "desc1": "02月09号，优化管理后台，增加操作信息框",
        "desc2": "优化网站统计数据，修复若干bug",
        "date": "2017/02",
        "time": "09 周四"
    },
    {
        "title": "增加Markdown编辑器对于数学公式渲染的支持",
        "desc1": "03月29号，支持数学公式的渲染显示，修复若干个bug",
        "desc2": "在<a href=\"https://www.npmjs.com/package/marked\">marked</a>解析器的基础上支持数学公式的编辑，并将修改后的包发布到npm上：<a href=\"https://www.npmjs.com/package/marked-katex\">marked-katex</a>",
        "date": "2017/03",
        "time": "29 周三"
    },
    {
        "title": "迁移网站到https，删掉些功能，添加新东西",
        "desc1": "05月12号，升级网站到https,05月13号，增加[关于豆米](https://blog.5udou.cn/aboutDouMi)页面",
        "desc2": "05月13号，增加[米喳简历](https://blog.5udou.cn/resume/mizha)页面",
        "date": "2018/05",
        "time": "13 周日"
    },
    {
        "title": "抽离controller主逻辑，支持api请求获取数据",
        "desc1": "01月04号，抽离controller的主逻辑，支持api请求，不再单一支持服务端渲染",
        "desc2": "01月05号，新增8个api，覆盖完整博客的请求，为小程序和RN版本提供接口",
        "date": "2019/01",
        "time": "04 周六"
    },
    {
        "title": "接入gitalk评论系统，增加渠道曝光",
        "desc1": "11月21号，弃用disqus评论系统，改用gitalk评论系统，好用不止一点点~",
        "desc2": "11月21号，优化SEO，增加小程序曝光，优化博客详情页底部展示信息",
        "date": "2019/11",
        "time": "21 周四"
    }
]

@View('/about/blog')
export default class AboutWebsite extends React.Component<Prop, State> {
  render() {
    return (
      <BlogContainer>
        <Timeline
          title='网站更新记录'
          timeList={data.map(item => ({
            subTitle: item.title,
            time: `${item.date} ${item.time}`,
            desc: `${item.desc1}${item.desc2}`
          }))}
        />
        <Divider />
        <Timeline
          title='网站技术栈'
          timeList={[{
            subTitle: '前端',
            time: '2020-01-03',
            desc: 'Malagu+React+ReactRouter'
          }]}
        />
      </BlogContainer>
    )
  }
}