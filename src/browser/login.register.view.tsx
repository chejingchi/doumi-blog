import * as React from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { Autorpc } from '@malagu/rpc/lib/common/annotation/detached';
import { View } from '@malagu/react/lib/browser';
import { Fab } from '@material-ui/core';
import { ArrowForward, Done } from '@material-ui/icons';
import { BlogServer, DouMiBlog } from '../common/blog-protocol';
import './styles/login.less';
import LoginRegForm from './components/login&RegForm';

interface Props {

}

interface State {
  showForm: boolean;
  pageType: 'login' | 'register',
  reqSuccess: boolean
}

@View('/blog/auth/:type')
export class LoginOrRegister extends React.Component<Props, State> {

  @Autorpc(BlogServer)
  protected BlogServer!: BlogServer;

  constructor(props: Props) {
    super(props);

    this.state = {
      showForm: false,
      pageType: (this.props as any).match.params.type,
      reqSuccess: false,
    }
  }
  login = async (data: DouMiBlog.LoginParam) => {
    try {
      const res = await axios.post('/api/login', data);

      if (res.data.status && res.data.data === '登录成功') {
        this.setState({
          reqSuccess: true
        })
        setTimeout(() => {
          location.hash = '/blog/admin'
        }, 2000)
      }
    } catch (err) {
      console.log(err)
    }

  }
  registerUser = async (data: DouMiBlog.RegisterParam) => {
    try {
      const result = await this.BlogServer.registerUser(data)

      if (result === '注册成功') {
        this.setState({
          reqSuccess: true
        })
        setTimeout(() => {
          location.hash = '/blog/auth/login'
        }, 2000)
      }
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    const { showForm, pageType, reqSuccess } = this.state;
    return (
    <div className='login-container'>
      <div className='login-wrapper'>
        <section className={clsx({
          'login-form': true,
          'animation': reqSuccess
        })}>
          <div className={clsx({
            'welcome-login': true,
            'hidden': showForm
          })}>
            <p>We</p>
            <p>LOVE</p>
            <p>LIFE</p>
          </div>
          <Fab color="secondary" className={clsx({
            'login-forward': true,
            'hidden': showForm
           })} onClick={() => this.setState({ showForm: true })}>
            <ArrowForward />
          </Fab>
          <LoginRegForm
            type={pageType}
            visible={showForm}
            registerCb={this.registerUser}
            loginCb={this.login}
            actionSuccess={reqSuccess} />
          <div className={clsx({
            "success-tip": true,
            "active": reqSuccess
          })}><span>{pageType === 'register' ? '注册成功' : '登录成功'}</span><Done /></div>
        </section>
      </div>
    </div>
    )
  }
}