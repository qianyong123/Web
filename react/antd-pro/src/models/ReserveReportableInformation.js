import { requestApi } from '@/services/api'
import { formatListResponse } from '@/utils/utils'

/**
 * 可行性报告
 */

export default {
  namespace: 'ReserveReportableInformation',

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
        const res = yield call(requestApi, '/fdnpm/reportInformation/listPage', payload, {
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
          `/fdnpm/reportInformation/findById`,
          {},
          {
            method: 'GET',
            params: payload,
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
        const res = yield call(requestApi, '/fdnpm/reportInformation/insert', payload, {})
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }
    },
    *update({ payload, callback }, { call }) {
      try {
        const res = yield call(requestApi, '/fdnpm/reportInformation/updateById', payload, {
          method: 'PUT',
        })
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }
    },
    *remove({ payload, callback }, { call }) {
      try {
        const res = yield call(
          requestApi,
          `/fdnpm/reportInformation/deleteById`,
          {},
          { params: payload }
        )
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }
    },
    // 审核
    *audit({ payload, callback }, { call }) {
      try {
        const res = yield call(requestApi, `/fdnpm/basicBuild/audit`, payload)
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
