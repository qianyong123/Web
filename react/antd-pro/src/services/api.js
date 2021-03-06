import { stringify } from 'qs'
import Cookies from 'js-cookie'
import { notification, Modal } from 'antd'
import request from '@/utils/request'

const API_URL = ''

export async function queryProjectNotice() {
  return request('/api/project/notice')
}

export async function queryActivities() {
  return request('/api/activities')
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`)
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  })
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  })
}

export async function updateRule(params = {}) {
  return request(`/api/rule?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  })
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  })
}

export async function fakeChartData() {
  return request('/api/fake_chart_data')
}

export async function queryTags() {
  return request('/api/tags')
}

export async function queryBasicProfile(id) {
  return request(`/api/profile/basic?id=${id}`)
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced')
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`)
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'delete',
    },
  })
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'post',
    },
  })
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'update',
    },
  })
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  })
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    data: params,
  })
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`)
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`)
}

export async function requestApi(url = '', params, options = {}) {
  const headers = {
    ...(Cookies.get('token') ? { Authorization: Cookies.get('token') } : null),
    // accept: '*/*',
    // ...options.headers,
    ...(options.method === 'GET' ? null : { 'content-type': 'application/json' }),
  }

  return request(`${API_URL}${url}`, {
    method: 'POST',
    ...(options.method === 'GET'
      ? {
          params,
        }
      : { data: JSON.stringify(params) }),
    headers,
    paramsSerializer: param => stringify(param),
    ...options,
  }).then((res = {}) => {
    const { code, msg } = res
    // if (code && code === 200) {
    //   return res
    // }
    if (res) {
      return res
    }
    notification.destroy()
    const errorDesc = {
      message: `请求错误 ${code}`,
      description: msg,
    }

    if (url.indexOf('user/login') !== -1) {
      Modal.error({
        title: '登录失败',
        content: msg || '登录错误',
        okText: '确定',
      })
    } else {
      notification.error(errorDesc)
    }
    return Promise.reject(errorDesc)
    // throw new Error(`请求错误 ${url} ${code}：${msg}`)
  })
}
