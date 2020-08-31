import { requestApi } from '@/services/api'

export default {
  namespace: 'map',
  state: {},
  effects: {
    *fetch({ payload }, { call }) {
      try {
        const res = yield call(requestApi, '/fdnpm/map/selectMap', payload, {
          method: 'GET',
        })
        return res
      } catch (error) {
        Promise.reject(error)
      }
    },
  },
  reducers: {},
}
