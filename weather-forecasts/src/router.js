import React from 'react';
import loadable from './util/loadable'

const Home = loadable(() => import('./pages/Home'))
const Note = loadable(() => import('./pages/Note'))
const Detail = loadable(() => import('./pages/Detail'))
const UploadText = loadable(() => import('./pages/UploadText'))
const Admin = loadable(() => import('./pages/Admin'))
const Login = loadable(() => import('./pages/Login'))
const Weather = loadable(() => import('./pages/Weather'))


const Error = loadable(() => import('./pages/Error'))

export const routerChild = [
  {
    path: '/login',
    name: '登录',
    hide:true,
    component:Login,
  },
  {
    path: '/weather',
    name: '天气页面',
    hide:true,
    component:Weather,
  },
  {
    path: '/note',
    name: 'note',
    hide:true,
    component:Note,
  },
  {
    path: '/JavaScript',
    name: 'JavaScript',
    component:Home,
  },
  {
    path: '/HtmlCss',
    name: 'HtmlCss',
    component:Home,
  },
  {
    path: '/Vue',
    name: 'Vue',
    component:Home,
  },
  {
    path: '/React',
    name: 'React',
    component:Home,
  },
  {
    path: '/Rest',
    name: '杂类技术',
    component:Home,
  },
  {
    path: '/Detail',
    name: 'detail',
    hide:true,
    component:Detail,
  },

  {
    path: '/uploadText',
    name: '上传文章',
    hide:true,
    component:UploadText,
  },
]

// 跳转到二级子路由不能有exact
 const router = [
  {
    path: '/home',
    name: '首页',
    component:Home,
  },
  ...routerChild,
  // {
  //   path: '/Admin',
  //   name: 'Admin',
  //   hide:true,
  //   component:<Admin />,
  // },
 
  // {
  //   path: '/error',
  //   name: '404',
  //    hide:true,
  //   component:<Error />,
  // },
]

export default router