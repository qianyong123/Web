import { requestApi } from '@/services/api'
import { formatListResponse } from '@/utils/utils'

/**
 * 基本建设
 */

export default {
  namespace: 'annualMaterialReview',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    // 分类
    nameList: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      try {
        const res = yield call(requestApi, '/fdnpm/yearMaterials/listPage', payload, {
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
          `/fdnpm/yearMaterials/findById`,
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
        const res = yield call(requestApi, '/fdnpm/yearMaterials/insert', payload, {})
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }
    },
    *update({ payload, callback }, { call }) {
      try {
        const res = yield call(requestApi, '/fdnpm/yearMaterials/updateById', payload, {
          method: 'PUT',
        })
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }
    },
    *remove({ payload, callback }, { call }) {
      try {
        const res = yield call(requestApi, `/fdnpm/yearMaterials/deleteById`, payload, {
          params: payload,
        })
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }
    },
    *getSelectName({ payload }, { call, put }) {
      try {
        const res = yield call(requestApi, `/fdnpm/yearMaterials/getName`, payload, {
          method: 'GET',
        })
        yield put({
          type: 'saveSelectName',
          payload: res.code === 200 && res.data !== null ? res.data : [],
        })
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
    saveSelectName(state, { payload }) {
      return {
        ...state,
        // data: {list:payload},
        nameList: payload,
      }
    },
  },
}
