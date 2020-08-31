import { requestApi } from '@/services/api'
import { formatListResponse } from '@/utils/utils'

export default {
  namespace: 'welcome',

  state: {
    data: {},
    areaList: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      try {
        const res = yield call(requestApi, '/aeem/userInfo/isPerfect', payload, { method: 'GET' })
        yield put({
          type: 'saveList',
          payload: res.data,
        })
      } catch (error) {
        Promise.reject(error)
      }
    },
    *fetchAreaList({ payload, callback }, { call, put }) {
      try {
        const res = yield call(
          requestApi,
          `/sys/sysRegion/getListByParentId/${payload.id}`,
          payload,
          { method: 'GET' }
        )
        yield put({
          type: 'saveAreaList',
          payload: res,
        })
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }
    },
    *add({ payload, callback }, { call }) {
      try {
        const res = yield call(requestApi, '/aeem/userInfo/consummate', payload)
        // yield put({
        //   type: 'addItem',
        //   payload: formatListResponse(res),
        // })
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }
    },
    *update({ payload, callback }, { call }) {
      try {
        const res = yield call(requestApi, '/sys/user/updateUser', payload)
        // yield put({
        //   type: 'upateItem',
        //   payload: formatListResponse(res),
        // })
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }
    },
    *remove({ payload, callback }, { call }) {
      try {
        const res = yield call(requestApi, `/sys/user/batchDeleteUser/${payload.ids}`, {})
        // yield put({
        //   type: 'removeItem',
        //   payload: formatListResponse(res),
        // })
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }
    },
    *reset({ payload, callback }, { call }) {
      try {
        const res = yield call(requestApi, `/sys/user/resetPwd`, payload)
        // yield put({
        //   type: 'removeItem',
        //   payload: formatListResponse(res),
        // })
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }
    },
  },

  reducers: {
    saveList(state, { payload }) {
      return {
        ...state,
        data: payload,
      }
    },
    saveAreaList(state, { payload }) {
      return {
        ...state,
        areaList: payload,
      }
    },
  },
}
