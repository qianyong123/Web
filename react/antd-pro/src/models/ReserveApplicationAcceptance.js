import { requestApi } from '@/services/api'
import { formatListResponse } from '@/utils/utils'

/**
 * 鉴定单位管理model
 */

export default {
  namespace: 'ReserveApplicationAcceptance',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    constructionType: [], // 建设类型
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      try {
        const res = yield call(requestApi, '/fdnpm/checkApply/listPage', payload, {
          method: 'GET',
        })
        yield put({
          type: 'saveList',
          payload: formatListResponse(res),
        })
      } catch (error) {
        Promise.reject(error)
      }
    },
    *fetchDetail({ payload }, { call }) {
      try {
        const { data } = yield call(
          requestApi,
          `/fdnpm/checkApply/findById`,
          {},
          {
            params: payload,
            method: 'GET',
          }
        )
        return data || {}
      } catch (error) {
        Promise.reject(error)
      }
      return null
    },
    *add({ payload, callback }, { call }) {
      try {
        const res = yield call(requestApi, '/fdnpm/checkApply/insert', payload, {})
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }
    },
    *update({ payload, callback }, { call }) {
      try {
        const res = yield call(requestApi, '/fdnpm/checkApply/updateById', payload, {
          method: 'PUT',
        })
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }
    },
    *remove({ payload, callback }, { call }) {
      try {
        const res = yield call(requestApi, `/fdnpm/checkApply/deleteById`, payload, {
          params: payload,
        })
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        constructionType: payload,
      }
    },
    saveList(state, { payload }) {
      return {
        ...state,
        // data: {list:payload},
        data: payload,
      }
    },
  },
}
