import { requestApi } from '@/services/api'
import { formatListResponse } from '@/utils/utils'

export default {
  namespace: 'modelManagement',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      //调查任务-获取所有调查任务分页及条件查询
      try {
        const res = yield call(
          requestApi,
          '/fyzdj/surveyTaskCheck/getSurveyTasksPageCheck',
          payload,
          {
            method: 'GET',
          }
        )
        yield put({
          type: 'saveList',
          payload: formatListResponse(res),
        })
      } catch (error) {
        Promise.reject(error)
      }
    },
    // *turnBack({ payload, callback }, { call }) {  //更新审核状态为驳回
    //     try {
    //         const res = yield call(requestApi, '/fyzdj/rejectOpinion/insertRejectOpinions', payload,
    //             { method: 'POST' })
    //         if (res.code === 200) {
    //             const r = yield call(requestApi, `/fyzdj/surveyTaskCheck/updateSurveyTasksThree?surveyTaskIdThree=${payload.id}`, {},
    //                 { method: 'PUT' })
    //             if (callback) callback(r)
    //         }
    //     } catch (error) {
    //         Promise.reject(error)
    //     }
    // },
    // *passTask({ payload, callback }, { call }) {  //更新审核状态为已通过/已审核
    //     try {
    //         const res = yield call(requestApi, `/fyzdj/surveyTaskCheck/updateSurveyTasksTwo?surveyTaskIdTwo=${payload}`, {}, { method: 'PUT' })
    //         if (callback) callback(res)
    //     } catch (error) {
    //         Promise.reject(error)
    //     }
    // },
    // *passMoreTask({ payload, callback }, { call }) {  //批量更新审核状态为已通过/已审核
    //     try {
    //         const res = yield call(requestApi, 'fyzdj/surveyTaskCheck/updateStatusTwoBatch', payload, { method: 'POST' })
    //         if (callback) callback(res)
    //     } catch (error) {
    //         Promise.reject(error)
    //     }
    // },
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
