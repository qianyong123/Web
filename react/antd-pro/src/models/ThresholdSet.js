import { requestApi } from '@/services/api'
import { formatListResponse } from '@/utils/utils'

/**
 * 鉴定单位管理model
 */

export default {
  namespace: 'ThresholdSet',

  state: {
    data: {
      list: [{ protectionZone: '成都武侯区', id: 1 }],
      pagination: {},
    },
    chinaProtectLevel: [],
    IUCNLevel: [],
    convAppendixRank: [],
    constructionType: [{ id: 1, value: '标注' }], // 建设类型
    nameList: [],
    typeList: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      try {
        const res = yield call(requestApi, '/fdnpm/thresholdValue/listPage', payload, {
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
    // 通过ID查询当前数据信息
    *fetchFind({ payload, callback }, { call }) {
      try {
        const res = yield call(requestApi, '/fdnpm/thresholdValue/view', payload, {
          method: 'GET',
        })
        if (callback) callback(res.data)
      } catch (error) {
        Promise.reject(error)
      }
    },
    *fetchDetail({ payload }, { call }) {
      try {
        const { data } = yield call(
          requestApi,
          `/fdnpm/basicBuild/findById?id=${payload.id}`,
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
    //获取名称下拉
    *fetchNameList({ payload }, { call, put }) {
      try {
        const { data } = yield call(
          requestApi,
          `/fdnpm/trendAnalysis/getAnimalNames`,
          {},
          {
            method: 'GET',
          }
        )
        yield put({
          type: 'saveNameList',
          payload: data,
        })
        return data
      } catch (error) {
        Promise.reject(error)
      }
      return null
    },
    // 获取指标分类下拉
    *fetchTypeList({ payload }, { call, put }) {
      try {
        const { data } = yield call(
          requestApi,
          `/fdnpm/trendAnalysis/getTargetSort`,
          {},
          {
            method: 'GET',
          }
        )
        yield put({
          type: 'saveTypeList',
          payload: data,
        })
        return data
      } catch (error) {
        Promise.reject(error)
      }
      return null
    },
    *add({ payload, callback }, { call }) {
      try {
        const res = yield call(requestApi, '/fdnpm/basicBuild/insert', payload, {
          headers: {
            'content-type': 'application/json',
          },
        })
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }
    },
    *update({ payload, callback }, { call }) {
      try {
        const res = yield call(requestApi, '/fdnpm/basicBuild/updateById', payload, {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
          },
        })
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }
    },
    *remove({ payload, callback }, { call }) {
      try {
        const res = yield call(requestApi, `/fdnpm/basicBuild/deleteById`, payload)
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }
    },
    // 审核
    *audit({ payload, callback }, { call }) {
      try {
        const res = yield call(requestApi, `/fdnpm/basicBuild/audit`, payload, {
          params: payload,
        })
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }
    },
    // 获取建筑分类
    *fetchBuildSort({ payload }, { call, put }) {
      try {
        const res = yield call(requestApi, `/fdnpm/basicBuild/BuildSort`, payload, {
          method: 'GET',
          params: payload,
        })
        yield put({
          type: 'save',
          payload: res.data,
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
    saveNameList(state, { payload }) {
      return {
        ...state,
        nameList: payload,
      }
    },
    saveTypeList(state, { payload }) {
      return {
        ...state,
        typeList: payload,
      }
    },
  },
}
