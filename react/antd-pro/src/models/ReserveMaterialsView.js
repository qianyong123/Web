import { requestApi } from '@/services/api'
import { formatListResponse } from '@/utils/utils'

export default {
  namespace: 'reserveMaterialsView',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      try {
        const res = yield call(requestApi, `/fdnpm/reserveMaterials/listPage`, payload, {
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
    *fetchProtectList({ payload, callback }, { call }) {
      try {
        const { data } = yield call(
          requestApi,
          `/fdnpm/reserveMaterials/getProtectArea`,
          {},
          {
            method: 'GET',
          }
        )
        if (callback) callback(data)
        return data
      } catch (error) {
        Promise.reject(error)
      }
      return null
    },
    *fetchType({ payload, callback }, { call }) {
      try {
        const { data } = yield call(
          requestApi,
          `/fdnpm/trendAnalysis/getTargetSort`,
          {},
          {
            method: 'GET',
          }
        )
        if (callback) callback(data)
        return data
      } catch (error) {
        Promise.reject(error)
      }
      return null
    },
    *add({ payload, callback }, { call }) {
      try {
        const res = yield call(requestApi, '/fdnpm/reserveMaterials/insert', payload, {
          params: payload,
        })
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }
    },
    *update({ payload, callback }, { call }) {
      try {
        const res = yield call(requestApi, '/fdnpm/targetSort/updateById', payload, {
          method: 'PUT',
        })
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }
    },
    *remove({ payload, callback }, { call }) {
      try {
        const res = yield call(requestApi, `/fdnpm/targetSort/deleteById?id=${payload.id}`)
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
  },
}
