import { requestApi } from '@/services/api'
import { formatListResponse, formatListResponseAdaptation } from '@/utils/utils'

export default {
  namespace: 'informationMonitoring',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      try {
        const res = yield call(requestApi, `/fdnpm/protectArea/listPage`, payload, {
          method: 'GET',
        })
        // console.log(res)
        if (res.code === 200) {
          yield put({
            type: 'saveList',
            payload: formatListResponse(res),
          })
        }
      } catch (error) {
        Promise.reject(error)
      }
    },
    *fetchDetail({ payload }, { call }) {
      try {
        const { data } = yield call(
          requestApi,
          `/fdnpm/protectArea/getById/${payload.id}`,
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
        // const res = yield call(requestApi, `/fdnpm/protectArea/saveOrSubmit/${payload.isSubmit}`, payload, {})
        const res = yield call(requestApi, `/fdnpm/protectArea/saveOrSubmit/N`, payload, {})
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }
    },
    *update({ payload, callback }, { call }) {
      try {
        const res = yield call(requestApi, '/fdnpm/buildSort/updateById', payload, {
          method: 'PUT',
        })
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }
    },
    *remove({ payload, callback }, { call }) {
      try {
        const res = yield call(requestApi, `/fdnpm/buildSort/deleteById?id=${payload.id}`)
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }
    },
    // 获取所有权列表
    *fetchOwnership({ payload }, { call, put }) {
      try {
        const res = yield call(requestApi, `/fdsbsf/declareListing/listAllPower`, payload, {
          method: 'GET',
          params: payload,
        })
        yield put({
          type: 'save',
          payload: {
            listAllPower: res.data,
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
  },
}
