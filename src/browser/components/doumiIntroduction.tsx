import * as React from 'react';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import GitHub from '@material-ui/icons/GitHub'
import LocationOn from '@material-ui/icons/LocationOn'
import Link from '@material-ui/icons/Link';
import Twitter from '@material-ui/icons/Twitter'
import { DouMiAvatar } from './doumiAvatar';
import MuiLink from '@material-ui/core/Link';

export interface IntroProps {
  avatarSize: number,
  fontSize: number
}

const useStyles = makeStyles({
  doumiIntro: (props: number) => ({
    '& header': {
      fontWeight: 'bold',
      fontSize: props * 1.3,
      textShadow: '0 5px 8px rgba(0, 0, 0, 0.1)',
      color: '#119d55'
    },
    '& p': {
      fontSize: props,
      color: '#9E9E9E',
      lineHeight: 2,
      fontStyle: 'italic'
    }
  })
})

export function DouMiIntroduction(props: IntroProps) {
  const classes = useStyles(props.fontSize);

  return (
    <div className={classes.doumiIntro}>
      <DouMiAvatar avatarSize={props.avatarSize} />
      <header>豆米</header>
      <p>豆米目前生活在“上有天堂，下有苏杭”的杭州，美不胜收的美景之地也收获着甜蜜恩爱的生活。豆米热爱前端，热爱互联网，豆米是洋芋(土豆-豆)和米喳(米)的简称。</p>
      <Grid container spacing={1} justify="flex-start">
        <Grid item container alignItems="center" xs={1} sm={1}>
          <MuiLink href="https://www.amap.com/search?id=B0FFHEF1TQ&city=330103&geoobj=119.961315%7C30.173403%7C120.4557%7C30.407304&query_type=IDQ&zoom=12" color="inherit">
            {/* 这里跳转到高德地图 */}
            <LocationOn color="secondary" />
          </MuiLink>
        </Grid>
        <Grid item container alignItems="center" xs={1} sm={1}>
          <MuiLink href="https://5udou.cn" color="inherit">
            {/* 这里跳转到结婚纪念网站 */}
            <Link color="secondary" />
          </MuiLink>
        </Grid>
        <Grid item container alignItems="center" xs={1} sm={1}>
          <MuiLink href="https://github.com/linxiaowu66" color="inherit">
            {/* 这里跳转到Github主页 */}
            <GitHub color="secondary" />
          </MuiLink>
        </Grid>
        <Grid item container alignItems="center" xs={1} sm={1}>
          <MuiLink href="https://twitter.com/linxiaowu666" color="inherit">
            {/* 这里跳转到Twitter */}
            <Twitter color="secondary" />
          </MuiLink>
        </Grid>
      </Grid>
    </div>
  )
}
