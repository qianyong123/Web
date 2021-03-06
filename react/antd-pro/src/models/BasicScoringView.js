import { requestApi } from '@/services/api'
import { formatListResponse } from '@/utils/utils'

/**
 * 基本建设
 */

export default {
  namespace: 'BasicScoringView',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    basicsGradeList: [], // 评分列表
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      try {
        const res = yield call(requestApi, '/fdnpm/basicGrade/listPage', payload, {
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
        const { msg } = yield call(
          requestApi,
          `/fdnpm/basicGrade/findBasicsGrade`,
          {},
          {
            params: payload,
            method: 'GET',
          }
        )
        return msg || ''
      } catch (error) {
        Promise.reject(error)
      }
      return null
    },
    *update({ payload, callback }, { call }) {
      try {
        const res = yield call(
          requestApi,
          '/fdnpm/basicGrade/updateByTargetId',
          {},
          {
            method: 'PUT',
            params: payload,
          }
        )
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }
    },
    *getBasicsGrade({ payload = {} }, { call, put }) {
      // 获取评分列表
      try {
        const res = yield call(requestApi, `/fdnpm/basicGrade/getBasicsGrade`, payload, {
          method: 'GET',
        })
        yield put({
          type: 'saveBasicsGradeList',
          payload: res.data || [],
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
    saveBasicsGradeList(state, { payload }) {
      return {
        ...state,
        // data: {list:payload},
        basicsGradeList: payload,
      }
    },
  },
}
