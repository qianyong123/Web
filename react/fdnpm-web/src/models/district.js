import { requestApi } from '@/services/api'

const format = item => {
  return item.map(subItem => {
    const { id: value, regionName: title } = subItem
    const { children, ...rest } = subItem
    const tree = {
      ...rest,
      key: value,
      label: title,
      value,
      title,
    }
    if (children && children.length) {
      tree.children = format(children)
    }
    return tree
  })
}

export default {
  state: {
    data: {
      list: [],
      pagination: {},
    },
    currentUserRegions: [],
    pickerList: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      try {
        const res = yield call(requestApi, '/sys/sysRegion/getSysRegionTree', payload, {
          method: 'GET',
        })
        yield put({
          type: 'saveList',
          payload: res.data,
        })
        return res.data
      } catch (error) {
        Promise.reject(error)
      }
    },
    *fetchAddr({ payload }, { call }) {
      try {
        const res = yield call(requestApi, '/sys/sysRegion/getSysRegionTree', payload, {
          method: 'GET',
        })
        return res.data
      } catch (error) {
        Promise.reject(error)
      }
    },
    *fetchCurrentUserRegions({ payload }, { call, put }) {
      try {
        const res = yield call(requestApi, '/astcap/astiiRepaiRecord/getUserHiveRegions', payload)
        yield put({
          type: 'saveCurrentUserRegions',
          payload: res.data,
        })
      } catch (error) {
        Promise.reject(error)
      }
    },
  },
  reducers: {
    saveList(state, { payload }) {
      let { pickerList } = state
      const flatTree = []
      const trees = format([payload])
      pickerList = pickerList.length ? pickerList : trees
      return {
        ...state,
        data: {
          list: trees,
        },
        pickerList,
        flatTree,
      }
    },
    saveCurrentUserRegions(state, { payload }) {
      return {
        ...state,
        currentUserRegions: payload,
      }
    },
  },
}
