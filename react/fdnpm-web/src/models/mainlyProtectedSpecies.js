import { requestApi } from '@/services/api'
import { formatListResponse } from '@/utils/utils'

export default {
  namespace: 'mainlyProtectedSpecies',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    chinaProtectLevel: [],
    iucnRank: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      try {
        const res = yield call(requestApi, `/fdnpm/animalProtection/listPage`, payload, {
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
          `/fdnpm/animalProtection/findById?id=${payload.id}`,
          {},
          {
            method: 'GET',
          }
        )
        return data
      } catch (error) {
        Promise.reject(error)
      }
      return null
    },
    *add({ payload, callback }, { call }) {
      try {
        const res = yield call(requestApi, '/fdnpm/animalProtection/insert', payload)
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }
    },
    *update({ payload, callback }, { call }) {
      try {
        const res = yield call(requestApi, '/fdnpm/animalProtection/updateById', payload, {
          method: 'PUT',
        })
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }
    },
    *remove({ payload, callback }, { call }) {
      try {
        const res = yield call(requestApi, `/fdnpm/animalProtection/deleteById?id=${payload.id}`)
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }
    },
    // 获取中国保护等级下拉列表
    *fetchChinaProtectLevel({ payload }, { call, put }) {
      try {
        const res = yield call(requestApi, `/fdnpm/animalProtection/getChinaProtectRank`, payload, {
          method: 'GET',
          params: payload,
        })
        yield put({
          type: 'save',
          payload: {
            chinaProtectLevel: res.data,
          },
        })
      } catch (error) {
        Promise.reject(error)
      }
    },

    // 获取IUCN等级下拉列表
    *fetchIucnRank({ payload }, { call, put }) {
      try {
        const res = yield call(requestApi, `/fdnpm/animalProtection/getIucnRank`, payload, {
          method: 'GET',
          params: payload,
        })
        yield put({
          type: 'save',
          payload: {
            iucnRank: res.data,
          },
        })
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
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
