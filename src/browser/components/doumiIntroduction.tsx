import * as React from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import { LocationOn, Link, GitHub, Twitter } from '@material-ui/icons'
import { DouMiAvatar } from './doumiAvatar';

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
          {/* 这里跳转到高德地图 */}
          <LocationOn color="secondary" />
        </Grid>
        <Grid item container alignItems="center" xs={1} sm={1}>
          {/* 这里跳转到结婚纪念网站 */}
          <Link color="secondary" />
        </Grid>
        <Grid item container alignItems="center" xs={1} sm={1}>
          {/* 这里跳转到Github主页 */}
          <GitHub color="secondary" />
        </Grid>
        <Grid item container alignItems="center" xs={1} sm={1}>
          {/* 这里跳转到Twitter */}
          <Twitter color="secondary" />
        </Grid>
      </Grid>
    </div>
  )
}
