import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';
import RendererWrapper0 from 'E:/Web-master/Web/react/antd-pro/src/pages/.umi/LocaleWrapper.jsx';
import _dvaDynamic from 'dva/dynamic';

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/user',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__UserLayout" */ '../../layouts/UserLayout'),
          LoadingComponent: require('E:/Web-master/Web/react/antd-pro/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/UserLayout').default,
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
        exact: true,
      },
      {
        path: '/user/login',
        name: '登录',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__User__models__register.js' */ 'E:/Web-master/Web/react/antd-pro/src/pages/User/models/register.js').then(
                  m => {
                    return { namespace: 'register', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__User__Login" */ '../User/Login'),
              LoadingComponent: require('E:/Web-master/Web/react/antd-pro/src/components/PageLoading/index')
                .default,
            })
          : require('../User/Login').default,
        exact: true,
      },
      {
        path: '/user/register',
        name: 'register',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__User__models__register.js' */ 'E:/Web-master/Web/react/antd-pro/src/pages/User/models/register.js').then(
                  m => {
                    return { namespace: 'register', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__User__Register" */ '../User/Register'),
              LoadingComponent: require('E:/Web-master/Web/react/antd-pro/src/components/PageLoading/index')
                .default,
            })
          : require('../User/Register').default,
        exact: true,
      },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__User__models__register.js' */ 'E:/Web-master/Web/react/antd-pro/src/pages/User/models/register.js').then(
                  m => {
                    return { namespace: 'register', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__User__RegisterResult" */ '../User/RegisterResult'),
              LoadingComponent: require('E:/Web-master/Web/react/antd-pro/src/components/PageLoading/index')
                .default,
            })
          : require('../User/RegisterResult').default,
        exact: true,
      },
      {
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__404" */ '../404'),
              LoadingComponent: require('E:/Web-master/Web/react/antd-pro/src/components/PageLoading/index')
                .default,
            })
          : require('../404').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('E:/Web-master/Web/react/antd-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__BasicLayout" */ '../../layouts/BasicLayout'),
          LoadingComponent: require('E:/Web-master/Web/react/antd-pro/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/BasicLayout').default,
    Routes: [require('../Authorized').default],
    routes: [
      {
        path: '/',
        redirect: '/welcome',
        exact: true,
      },
      {
        path: '/welcome',
        name: 'welcome',
        icon: 'user',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__Welcome__models__welcome.js' */ 'E:/Web-master/Web/react/antd-pro/src/pages/Welcome/models/welcome.js').then(
                  m => {
                    return { namespace: 'welcome', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__Welcome__index" */ '../Welcome/index'),
              LoadingComponent: require('E:/Web-master/Web/react/antd-pro/src/components/PageLoading/index')
                .default,
            })
          : require('../Welcome/index').default,
        hideInMenu: true,
        exact: true,
      },
      {
        path: '/L7TC',
        name: '行政区域-填充图',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__L7TC__index" */ '../L7TC/index'),
              LoadingComponent: require('E:/Web-master/Web/react/antd-pro/src/components/PageLoading/index')
                .default,
            })
          : require('../L7TC/index').default,
        icon: 'disconnect',
        exact: true,
      },
      {
        path: '/L7TC2',
        name: '行政区域-钻取图',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__L7TC2__index" */ '../L7TC2/index'),
              LoadingComponent: require('E:/Web-master/Web/react/antd-pro/src/components/PageLoading/index')
                .default,
            })
          : require('../L7TC2/index').default,
        icon: 'disconnect',
        exact: true,
      },
      {
        path: '/Amap',
        name: '高德地图',
        icon: 'disconnect',
        routes: [
          {
            path: '/Amap/Marker',
            name: 'Marker',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Amap__Marker__index" */ '../Amap/Marker/index'),
                  LoadingComponent: require('E:/Web-master/Web/react/antd-pro/src/components/PageLoading/index')
                    .default,
                })
              : require('../Amap/Marker/index').default,
            exact: true,
          },
          {
            path: '/Amap/SpatialAnalysis',
            name: '行政区划浏览',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Amap__SpatialAnalysis__index" */ '../Amap/SpatialAnalysis/index'),
                  LoadingComponent: require('E:/Web-master/Web/react/antd-pro/src/components/PageLoading/index')
                    .default,
                })
              : require('../Amap/SpatialAnalysis/index').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('E:/Web-master/Web/react/antd-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/Antd',
        name: '组件',
        icon: 'disconnect',
        routes: [
          {
            path: '/Antd/Transfer',
            name: 'antd穿梭框',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Antd__Transfer__index" */ '../Antd/Transfer/index'),
                  LoadingComponent: require('E:/Web-master/Web/react/antd-pro/src/components/PageLoading/index')
                    .default,
                })
              : require('../Antd/Transfer/index').default,
            exact: true,
          },
          {
            path: '/Antd/ReactContext',
            name: 'react-context',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Antd__ReactContext__index" */ '../Antd/ReactContext/index'),
                  LoadingComponent: require('E:/Web-master/Web/react/antd-pro/src/components/PageLoading/index')
                    .default,
                })
              : require('../Antd/ReactContext/index').default,
            exact: true,
          },
          {
            path: '/Antd/FunElement',
            name: 'react函数组件',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Antd__FunElement__index" */ '../Antd/FunElement/index'),
                  LoadingComponent: require('E:/Web-master/Web/react/antd-pro/src/components/PageLoading/index')
                    .default,
                })
              : require('../Antd/FunElement/index').default,
            exact: true,
          },
          {
            path: '/Antd/ThrottlingStabilization',
            name: '节流防抖',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Antd__ThrottlingStabilization__index" */ '../Antd/ThrottlingStabilization/index'),
                  LoadingComponent: require('E:/Web-master/Web/react/antd-pro/src/components/PageLoading/index')
                    .default,
                })
              : require('../Antd/ThrottlingStabilization/index').default,
            exact: true,
          },
          {
            path: '/Antd/Hook',
            name: 'Hook',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Antd__Hook__index" */ '../Antd/Hook/index'),
                  LoadingComponent: require('E:/Web-master/Web/react/antd-pro/src/components/PageLoading/index')
                    .default,
                })
              : require('../Antd/Hook/index').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('E:/Web-master/Web/react/antd-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__404" */ '../404'),
              LoadingComponent: require('E:/Web-master/Web/react/antd-pro/src/components/PageLoading/index')
                .default,
            })
          : require('../404').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('E:/Web-master/Web/react/antd-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: () =>
      React.createElement(
        require('E:/Web-master/Web/react/antd-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
