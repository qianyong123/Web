import { query as queryUsers } from '@/services/user'
import { requestApi } from '@/services/api'
import { setAuthority } from '@/utils/authority'
import { reloadAuthorized } from '@/utils/Authorized'

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: { region: {} },
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers)
      yield put({
        type: 'save',
        payload: response,
      })
    },
    *fetchCurrent(_, { call, put }) {
      try {
        const res = yield call(requestApi, '/sys/user/getLoginUser', {}, { method: 'GET' })
        yield put({
          type: 'saveCurrentUser',
          payload: res.data,
        })
      } catch (error) {
        Promise.reject(error)
      }
    },
    *fetchUserHavePermission(_, { call, put }) {
      try {
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
        if (res.code === 200) {
          reloadAuthorized()
        }
      } catch (error) {
        Promise.reject(error)
      }
    },
    *fetchUserRegion({ callback }, { call, put }) {
      try {
        const res = yield call(requestApi, `/astcap/astii/userRegions`, {}, { method: 'GET' })
        yield put({
          type: 'saveUserRegion',
          payload: res.data,
        })
        if (callback) callback(res.data)
      } catch (error) {
        Promise.reject(error)
      }
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      }
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      }
    },
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority)
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      }
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      }
    },
    saveUserRegion(state, { payload }) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          region: payload,
        },
      }
    },
  },
}
