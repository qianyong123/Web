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
      // {
      //   path: '/AGraphic',
      //   name: 'L7地图',
      //   component: './AGraphic/index',
      //   icon: 'disconnect',
      // },
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
        path: '/Amap',
        name: '高德地图',
        icon: 'disconnect',
        routes:[
          {
            path: '/Amap/Marker',
            name: 'Marker',
            component: './Amap/Marker/index',
          },
          // {
          //   path: '/Amap/AdministrativeRegion',
          //   name: '行政区地图',
          //   component: './Amap/AdministrativeRegion/index',
          // },
          {
            path: '/Amap/SpatialAnalysis',
            name: '行政区划浏览',
            component: './Amap/SpatialAnalysis/index',
          },
          
        ]
      },
      {
        path: '/Antd',
        name: '组件',
        icon: 'disconnect',
        routes:[
          {
            path: '/Antd/Transfer',
            name: 'antd穿梭框',
            component: './Antd/Transfer/index',
          },
          {
            path: '/Antd/ReactContext',
            name: 'react-context',
            component: './Antd/ReactContext/index',
   
          },
          {
            path: '/Antd/FunElement',
            name: 'react函数组件',
            component: './Antd/FunElement/index',
          },
          {
            path: '/Antd/ThrottlingStabilization',
            name: '节流防抖',
            component: './Antd/ThrottlingStabilization/index',
          },
          {
            path: '/Antd/Hook',
            name: 'Hook',
            component: './Antd/Hook/index',
          },
        ]
      },
      
      {
        component: '404',
      },
    ],
  },
]
