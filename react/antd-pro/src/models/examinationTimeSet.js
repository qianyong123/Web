import { requestApi } from '@/services/api'

/**
 * 基本建设
 */

export default {
  namespace: 'examinationTimeSet',

  state: {},

  effects: {
    *fetchDetail({ payload }, { call }) {
      try {
        const { data } = yield call(
          requestApi,
          `/fdnpm/examTime/findByYear`,
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

    *update({ payload, callback }, { call }) {
      try {
        const res = yield call(requestApi, '/fdnpm/examTime/updateByYear', payload, {
          method: 'PUT',
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
