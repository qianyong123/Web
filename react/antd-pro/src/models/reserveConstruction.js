import { requestApi } from '@/services/api'
import { formatListResponse } from '@/utils/utils'

/**
 * 基本建设
 */

export default {
  namespace: 'resere',

  state: {
    data: {
      list: [],
      pagination: {},
    },

    constructionType: [], // 建设类型
    statusList: [
      { id: 1, value: '已保存' },
      { id: 2, value: '已提交' },
      // { id: 3, value: '已撤回' },
      { id: 4, value: '通过' },
      { id: 5, value: '退回' },
      // { id: 6, value: '总站通过' },
      // { id: 7, value: '总站退回' }
    ], // 审核状态
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      try {
        const res = yield call(requestApi, '/fdnpm/basicBuild/listPage', payload, {
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
          `/fdnpm/basicBuild/findById`,
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
        const res = yield call(requestApi, '/fdnpm/basicBuild/insert', payload, {})
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }
    },
    *update({ payload, callback }, { call }) {
      try {
        const res = yield call(requestApi, '/fdnpm/basicBuild/updateById', payload, {
          method: 'PUT',
        })
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }
    },
    *remove({ payload, callback }, { call }) {
      try {
        const res = yield call(requestApi, `/fdnpm/basicBuild/deleteById`, payload, {
          params: payload,
        })
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }
    },
    // 审核
    *audit({ payload, callback }, { call }) {
      try {
        const res = yield call(requestApi, `/fdnpm/basicBuild/audit`, payload, {})
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }
    },
    // 获取建筑分类
    *fetchBuildSort({ payload }, { call, put }) {
      try {
        const res = yield call(requestApi, `/fdnpm/basicBuild/buildSort`, payload, {
          method: 'GET',
          params: payload,
        })
        yield put({
          type: 'save',
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
  },
}
