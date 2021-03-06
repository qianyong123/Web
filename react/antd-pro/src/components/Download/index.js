import React, { PureComponent } from 'react'
import { string, object, func } from 'prop-types'
import Cookies from 'js-cookie'
import { extend } from 'umi-request'
import { notification, message } from 'antd'
import Styles from './index.less'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误或文件资源不存在',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
}

/**
 * 异常处理程序
 */
const errorHandler = error => {
  const { response = {} } = error
  const errortext = codeMessage[response.status] || response.statusText
  const { status, url } = response
  let errorMessage
  notification.destroy()
  if (status === 401 && url.indexOf('user/signout') === -1) {
    errorMessage = '未登录或登录已过期，请重新登录。'
    notification.error({
      message: errorMessage,
    })

    // @HACK
    /* eslint-disable no-underscore-dangle */
    window.g_app._store.dispatch({
      type: 'login/logout',
    })
  } else {
    errorMessage = `${errortext}`
  }
  throw new Error(errorMessage)
}

export default class Download extends PureComponent {
  static propTypes = {
    action: string,
    accept: string,
    method: string,
    params: object,
    callback: func,
    beforeDownload: func,
  }

  static defaultProps = {
    action: '/sys/fileManage/downloadFile',
    accept: '*/*',
    method: 'GET',
    params: {},
    callback: () => {},
    beforeDownload: async () => {},
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  downFile = (blob, fileName) => {
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, fileName)
    } else {
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = fileName
      link.click()
      window.URL.revokeObjectURL(link.href)
    }
  }

  downloadTmpl = () => {
    const { params = {}, accept, method, action, callback } = this.props

    const headers = {
      ...(Cookies.get('token') ? { Authorization: Cookies.get('token') } : null),
      Accept: accept,
    }

    const request = extend({
      errorHandler, // 默认错误处理
      credentials: 'include', // 默认请求是否带上cookie
    })
    this.setState({
      loading: true,
    })
    return request(action, {
      method,
      headers,
      responseType: 'arrayBuffer',
      getResponse: true,
      params,
      ...(Object.keys(params).length ? { data: JSON.stringify(params) } : null),
    })
      .then(({ data, response }) => {
        if (data.code && data.code === 1000) {
          const { code, msg } = data
          const errorDesc = {
            message: `请求错误 ${code}`,
            description: msg,
          }
          notification.error(errorDesc)
          return
        }
        const contentDisposition = response.headers.get('content-disposition')
        let [fileName] = contentDisposition.split('=').slice(-1)
        fileName = fileName.replace(`utf-8''`, '')
        // const suffix = fileName.replace(/.*(\.\w+)$/i, '$1')
        // const mimes = {
        //   xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        // }
        // const blob = new Blob([data], {
        //   ...(mimes[suffix.toUpperCase()] ? { type: mimes[suffix.toUpperCase()] } : null),
        // })
        const blob = new Blob([data])
        this.downFile(blob, decodeURI(fileName))
      })
      .then(() => callback())
      .finally(() => {
        this.setState({ loading: false })
      })
  }

  start = () => {
    const { beforeDownload } = this.props
    beforeDownload()
      .then(() => this.downloadTmpl())
      .catch(e => message.error(e.message))
  }

  render() {
    const { loading } = this.state
    const { children, style = {} } = this.props
    return (
      <div
        className={Styles.commDownload}
        onClick={this.start}
        style={{ display: 'inline-block', ...style }}
      >
        {children({ loading })}
      </div>
    )
  }
}
