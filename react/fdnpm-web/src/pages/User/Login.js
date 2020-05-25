import React, { Component } from 'react'
import { connect } from 'dva'
import Cookies from 'js-cookie'
import md5 from 'md5'
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale'
import { Checkbox, Alert, message, Icon } from 'antd'
import Login from '@/components/Login'
import url from '@/assets/icon_arrow.png'
import styles from './Login.less'

const { UserName, Password, ImageCaptcha, Submit } = Login

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  state = {
    type: 'account',
    rememberMe: true,
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'login/getImageCaptcha',
      payload: {},
    })
    this.getAccount()
  }

  onTabChange = type => {
    this.setState({ type })
  }

  onGetCaptcha = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'login/getImageCaptcha',
      payload: {},
    })
  }

  handleSubmit = (err, values) => {
    const { rememberMe, type } = this.state
    if (!err) {
      const {
        dispatch,
        login: {
          imageCaptcha: { id: captchaId },
        },
      } = this.props
      const { password } = values
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          rememberMe,
          type,
          captchaId,
          password: md5(password),
          // currentAuthority:values.username,
        },
        callback: res => {
          if (res.code !== 200) {
            message.error(res.msg)
          } else {
            // const { sysUser: currentUser } = res.data
            // dispatch({
            //   type: 'user/saveCurrentUser',
            //   payload: currentUser,
            // })
            const { token } = res.data
            Cookies.set('token', token)
            if (rememberMe) {
              this.storageAccout({ ...values, rememberMe })
            } else {
              this.clearAccount()
            }
          }
        },
      })
    }
  }

  getAccount = () => {
    const rememberMe = !!window.localStorage.getItem('ASTCAP_REMEMBERME')
    if (rememberMe) {
      try {
        const ASTCAP_AUTH = window.atob(window.localStorage.getItem('ASTCAP_AUTH'))
        const { username, password } = JSON.parse(ASTCAP_AUTH)
        this.loginForm.setFieldsValue({ username, password })
      } catch (error) {
        localStorage.removeItem('ASTCAP_REMEMBERME')
        localStorage.removeItem('ASTCAP_AUTH')
      }
    }
    this.setState({ rememberMe })
  }

  storageAccout = data => {
    const { username, password, rememberMe } = data
    const ASTCAP_AUTH = {
      username,
      password,
    }
    window.localStorage.setItem('ASTCAP_AUTH', window.btoa(JSON.stringify(ASTCAP_AUTH)))
    window.localStorage.setItem('ASTCAP_REMEMBERME', rememberMe)
  }

  clearAccount = () => {
    window.localStorage.removeItem('ASTCAP_AUTH')
    window.localStorage.removeItem('ASTCAP_REMEMBERME')
  }

  changeRememberMe = e => {
    this.setState({
      rememberMe: e.target.checked,
    })
  }

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  )

  render() {
    const { login, submitting } = this.props
    const { type, rememberMe } = this.state
    return (
      <div className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles.main_left}>
            <div className={styles.welcome}>
              农业农村部农业生态与资源保护总站
              <span>
                <img alt="" style={{ margin: '-6px 0 0 6px' }} src={url} />
              </span>
            </div>
            <div className={styles.depict}>水生生物自然保护区信息子系统</div>
          </div>
          <div className={styles.main_right}>
            <Login
              defaultActiveKey={type}
              onTabChange={this.onTabChange}
              onSubmit={this.handleSubmit}
              ref={form => {
                this.loginForm = form
              }}
            >
              <div style={{ paddingTop: '40px' }}>
                {login.status === 'error' &&
                  login.type === 'account' &&
                  !submitting &&
                  this.renderMessage(
                    formatMessage({ id: 'app.login.message-invalid-credentials' })
                  )}
                <UserName
                  name="username"
                  placeholder={`${formatMessage({ id: 'app.login.userName' })}`}
                  prefix={<Icon type="user" style={{ color: '#2c9f35' }} />}
                  maxLength="20"
                  rules={[
                    {
                      required: true,
                      message: formatMessage({ id: 'validation.userName.required' }),
                    },
                    {
                      min: 3,
                      max: 20,
                      message: '用户名长度3 - 20个字符！',
                    },
                  ]}
                />
                <Password
                  name="password"
                  placeholder={`${formatMessage({ id: 'app.login.password' })}`}
                  prefix={<Icon type="lock" style={{ color: '#2c9f35' }} />}
                  maxLength="20"
                  rules={[
                    {
                      required: true,
                      message: formatMessage({ id: 'validation.password.required' }),
                    },
                    {
                      max: 20,
                      message: '密码长度不超过20个字符！',
                    },
                  ]}
                  onPressEnter={e => {
                    e.preventDefault()
                    this.loginForm.validateFields(this.handleSubmit)
                  }}
                />
                <ImageCaptcha
                  name="captcha"
                  maxLength="5"
                  placeholder={formatMessage({ id: 'form.verification-code.placeholder' })}
                  prefix={<Icon type="mail" style={{ color: '#2c9f35' }} />}
                  countDown={120}
                  onGetCaptcha={this.onGetCaptcha}
                  src={login.imageCaptcha.captcha}
                  getCaptchaButtonText={formatMessage({ id: 'form.get-captcha' })}
                  getCaptchaSecondText={formatMessage({ id: 'form.captcha.second' })}
                  rules={[
                    {
                      required: true,
                      message: '请输入验证码！',
                    },
                    {
                      min: 5,
                      max: 5,
                      message: '验证码格式不正确！',
                    },
                  ]}
                  onPressEnter={e => {
                    e.preventDefault()
                    this.loginForm.validateFields(this.handleSubmit)
                  }}
                />
              </div>
              <Submit loading={submitting} style={{ background: '#06b614' }}>
                <FormattedMessage id="app.login.login" />
              </Submit>
              <div style={{ marginBottom: '20px' }}>
                <Checkbox checked={rememberMe} onChange={this.changeRememberMe}>
                  <FormattedMessage id="app.login.remember-me" />
                </Checkbox>
              </div>
            </Login>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginPage
