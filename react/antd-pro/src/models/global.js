import { queryNotices, requestApi } from '@/services/api'

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    notices: [],
    yearList: [
      '2013',
      '2014',
      '2015',
      '2016',
      '2017',
      '2018',
      '2019',
      '2020',
      '2021',
      '2022',
      '2023',
      '2024',
      '2025',
    ],
    year: new Date().getFullYear() || '2020', // 当前年份
  },
  effects: {
    *fileRemove({ payload, callback }, { call }) {
      try {
        const res = yield call(requestApi, `/sys/fileManage/deleteFile`, payload, {
          params: payload,
        })
        if (callback) callback(res)
      } catch (error) {
        Promise.reject(error)
      }
    },
    *fetchNotices(_, { call, put, select }) {
      const data = yield call(queryNotices)
      yield put({
        type: 'saveNotices',
        payload: data,
      })
      const unreadCount = yield select(
        state => state.global.notices.filter(item => !item.read).length
      )
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: data.length,
          unreadCount,
        },
      })
    },
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      })
      const count = yield select(state => state.global.notices.length)
      const unreadCount = yield select(
        state => state.global.notices.filter(item => !item.read).length
      )
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: count,
          unreadCount,
        },
      })
    },
    *changeNoticeReadState({ payload }, { put, select }) {
      const notices = yield select(state =>
        state.global.notices.map(item => {
          const notice = { ...item }
          if (notice.id === payload) {
            notice.read = true
          }
          return notice
        })
      )
      yield put({
        type: 'saveNotices',
        payload: notices,
      })
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: notices.length,
          unreadCount: notices.filter(item => !item.read).length,
        },
      })
    },
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      }
    },
    saveNotices(state, { payload }) {
      return {
        ...state,
        notices: payload,
      }
    },
    saveClearedNotices(state, { payload }) {
      return {
        ...state,
        notices: state.notices.filter(item => item.type !== payload),
      }
    },
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search)
        }
      })
    },
  },
}
