import { routerRedux } from 'dva/router'
import { stringify } from 'qs'
import Cookies from 'js-cookie'
import { getFakeCaptcha, requestApi } from '@/services/api'
import { setAuthority } from '@/utils/authority'
import { getPageQuery } from '@/utils/utils'
import { reloadAuthorized } from '@/utils/Authorized'

export default {
  namespace: 'login',

  state: {
    status: undefined,
    imageCaptcha: {},
  },

  effects: {
    *login({ payload, callback }, { call, put }) {
      const response = yield call(requestApi, '/sys/user/login', payload)
      if (callback) {
        callback(response)
      }
      const res = yield call(
        requestApi,
        `/sys/user/getUserHavePermission/pmpps`,
        {},
        { method: 'GET' }
      )

      const { buttons = [], menus = [] } = res.data

      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: 'ok',
          type: 'account',
          currentAuthority: [...buttons, ...menus],
        },
      })

      // Login successfully
      if (response.code === 200) {
        reloadAuthorized()
        const urlParams = new URL(window.location.href)
        const params = getPageQuery()
        let { redirect } = params
        if (redirect) {
          const redirectUrlParams = new URL(redirect)
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length)
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1)
            }
          } else {
            redirect = null
          }
        }
        // yield put(routerRedux.replace(redirect || '/'))
        yield put(routerRedux.replace('/'))
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload)
    },
    *getImageCaptcha({ payload }, { call, put }) {
      const res = yield call(requestApi, '/sys/user/captcha', payload, { method: 'GET' })
      yield put({
        type: 'updateImage',
        payload: res,
      })
    },
    *fetchUserHavePermission(_, { call, put }) {
      try {
        const res = yield call(
          requestApi,
          `/sys/user/getUserHavePermission/aeem`,
          {},
          { method: 'GET' }
        )
        const { buttons = [], menus = [] } = res.data
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: 'ok',
            type: 'account',
            currentAuthority: [...buttons, ...menus],
          },
        })
        // if (res.code === 200) {
        //   reloadAuthorized()
        // }
      } catch (error) {
        Promise.reject(error)
      }
    },
    *logout({ payload }, { call, put }) {
      try {
        // yield call(requestApi, '/sys/user/signout', payload, { method: 'GET' })
      } catch (error) {
        Cookies.remove('token')
      } finally {
        Cookies.remove('token')
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        })
        reloadAuthorized()
        const { redirect } = getPageQuery()
        // redirect
        if (window.location.pathname !== '/user/login' && !redirect) {
          yield put(
            routerRedux.replace({
              pathname: '/user/login',
              search: stringify({
                redirect: window.location.href,
              }),
            })
          )
        }
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority)
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      }
    },
    updateImage(state, action) {
      return {
        ...state,
        imageCaptcha: action.payload.data,
      }
    },
  },
}
