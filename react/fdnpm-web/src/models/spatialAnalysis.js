import { requestApi } from '@/services/api'
// import { formatListResponse } from '@/utils/utils'

export default {
  namespace: 'spatialAnalysis',

  state: {
    data: {
      list: [],
      pagination: {},
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      try {
        const res = yield call(requestApi, '/fyrpa/spatialAnalyst/selectSpatialAnalystList', payload, { method: 'GET' })
        yield put({
          type: 'saveList',
          payload: res,
        })
      } catch (error) {
        Promise.reject(error)
      }
    },
    *fetchRole({ payload, callback }, { call, put }) {
      try {
        const res = yield call(requestApi, '/sys/permission/role/getUserHasRole', payload, { method: 'GET' })
        yield put({
          type: 'saveRole',
          payload: res,
        })
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }
    },

    *fetchRoleGroup({ payload, callback }, { call, put }) {
      try {
        const res = yield call(requestApi, '/sys/permission/roleGroup/getUserHasRoleGroup', payload, { method: 'GET' })
        yield put({
          type: 'saveRoleGroup',
          payload: res,
        })
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }

    },

    *add({ payload, callback }, { call }) {
      try {
        const res = yield call(requestApi, '/fyrpa/targetManager/add', payload)
        // yield put({
        //   type: 'addItem',
        //   payload: formatListResponse(res),
        // })
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }
    },
    *update({ payload, callback }, { call }) {
      try {
        const res = yield call(requestApi, '/fyrpa/targetManager/update', payload, {
          method: 'PUT'
        })
        // yield put({
        //   type: 'upateItem',
        //   payload: formatListResponse(res),
        // })
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }
    },
    *remove({ payload, callback }, { call }) {
      try {
        const res = yield call(requestApi, `/sys/user/batchDeleteUser/${payload.ids}`, {})
        // yield put({
        //   type: 'removeItem',
        //   payload: formatListResponse(res),
        // })
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }
    },
    *reset({ payload, callback }, { call }) {
      try {
        const res = yield call(requestApi, `/fyrpa/targetManager/startAndstopTarget`, payload, {
          method: 'PUT',
          addHeaderParam:true
        })
        // yield put({
        //   type: 'removeItem',
        //   payload: formatListResponse(res),
        // })
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
    saveRole(state, { payload }) {
      return {
        ...state,
        role: payload,
      }
    },
    saveRoleGroup(state, { payload }) {
      return {
        ...state,
        roleGroup: payload,
      }
    },
    addItem(state, { payload }) {
      return {
        ...state,
        data: payload,
      }
    },
    updateItem(state, { payload }) {
      return {
        ...state,
        data: payload,
      }
    },
    removeItem(state, { payload }) {
      return {
        ...state,
        data: payload,
      }
    },
  },
}
