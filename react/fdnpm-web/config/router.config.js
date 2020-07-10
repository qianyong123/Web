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
        name: '行政区域-填充图',
        component: './L7TC/index',
        icon: 'disconnect',
      },
      {
        path: '/L7TC2',
        name: '行政区域-钻取图',
        component: './L7TC2/index',
        icon: 'disconnect',
      },
      {
        path: '/Antd',
        name: 'antd',
        icon: 'disconnect',
        routes:[
          {
            path: '/Antd/Transfer',
            name: '穿梭框',
            component: './Antd/Transfer/index',
            icon: 'disconnect',
          },
        ]
      },
      {
        component: '404',
      },
    ],
  },
]
