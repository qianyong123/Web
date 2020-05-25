export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: '登录', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      { path: '/', redirect: '/welcome' },
      {
        path: '/welcome',
        name: 'welcome',
        icon: 'user',
        component: './Welcome/index',
        hideInMenu: true,
      },
      {
        path: '/AGraphic',
        name: 'L7地图',
        component: './AGraphic/index',
        icon: 'disconnect',
      },
      {
        path: '/L7TC',
        name: 'L7填充图',
        component: './L7TC/index',
        icon: 'disconnect',
      },
      // {
      //   path: '/InformationMonitoring',
      //   name: '采集信息',
      //   component: './InformationMonitoring/index',
      //   icon: 'form',
      // },
      // {
      //   path: '/AquaticLifeReserveManagement',
      //   name: '基本建设管理',
      //   icon: 'database',
      //   routes: [
      //     {
      //       path: '/AquaticLifeReserveManagement/ReserveConstruction',
      //       name: '基本建设',
      //       component: './AquaticLifeReserveManagement/ReserveConstruction/index',
      //     },
      //     {
      //       path: '/AquaticLifeReserveManagement/ReserveReportableInformation',
      //       name: '可行性报告信息',
      //       component: './AquaticLifeReserveManagement/ReserveReportableInformation/index',
      //     },
      //     {
      //       path: '/AquaticLifeReserveManagement/ReserveTheInitial',
      //       name: '初步设计',
      //       component: './AquaticLifeReserveManagement/ReserveTheInitial/index',
      //     },
      //     {
      //       path: '/AquaticLifeReserveManagement/ReserveApplicationAcceptance',
      //       name: '申请与验收',
      //       component: './AquaticLifeReserveManagement/ReserveApplicationAcceptance/index',
      //     },
      //   ],
      // },

      // {
      //   path: '/ManagementEffectEvaluation',
      //   name: '管理效应评估',
      //   icon: 'audit',
      //   routes: [
      //     {
      //       path: '/ManagementEffectEvaluation/BasicScoreSet',
      //       name: '基础计分指标分值设置',
      //       component: './ManagementEffectEvaluation/BasicScoreSet/index',
      //     },
      //     {
      //       path: '/ManagementEffectEvaluation/ExaminationTimeSet',
      //       name: '考核时间设置',
      //       component: './ManagementEffectEvaluation/ExaminationTimeSet/index',
      //     },
      //     {
      //       path: '/ManagementEffectEvaluation/BasicScoringView',
      //       name: '基础计分查看',
      //       component: './ManagementEffectEvaluation/BasicScoringView/index',
      //     },
      //     {
      //       path: '/ManagementEffectEvaluation/AnnualMaterialReview',
      //       name: '年度材料查看',
      //       component: './ManagementEffectEvaluation/AnnualMaterialReview/index',
      //     },
      //     {
      //       path: '/ManagementEffectEvaluation/ReserveMaterialsView',
      //       name: '保护区材料查看',
      //       component: './ManagementEffectEvaluation/ReserveMaterialsView/index',
      //     },
      //   ],
      // },
      {
        component: '404',
      },
    ],
  },
]
