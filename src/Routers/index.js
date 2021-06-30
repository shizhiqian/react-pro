/* eslint-disable */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Loadable from 'react-loadable'; // 用于代码分割时动态加载模块
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import Loading from '@/components/PageLoading';
import Menu from '@/components/Menu';
import Footer from '@/components/Footer';

const Home = Loadable({
  loader: () => import(/* webpackChunkName:'home' */ '@/pages/Home'),
  // loader: () => import(/* webpackChunkName:'home' */ '@/components/PageLoading'),
  loading: Loading,
  timeout: 10 * 1000, // 10秒
});
const Features = Loadable({
  loader: () => import(/* webpackChunkName:'features' */ '@/pages/Features'),
  loading: Loading,
});
const Test = Loadable({
  loader: () => import(/* webpackChunkName:'test' */ '@/pages/Test'),
  loading: Loading,
});
const TestClass = Loadable({
  loader: () => import(/* webpackChunkName:'testClass' */ '@/pages/TestClass'),
  loading: Loading,
});
// const Test = Loadable({
//   loader: () => import(/* webpackChunkName:'test' */ '../test'),
//   loading: Loading,
// });
// const TestClass = Loadable({
//   loader: () => import(/* webpackChunkName:'testclass' */ '../testclass'),
//   loading: Loading,
// });
// const Features = Loadable({
//   loader: () => import(/* webpackChunkName:'features' */ '../features'),
//   loading: Loading,
// });
const NotFound = Loadable({
  loader: () => import(/* webpackChunkName:'notfound' */ '@/pages/404/index.jsx'),
  loading: Loading,
});

/** 组件 **/
function RootRouterContainer(props) {
  // 在组件加载完毕后触发
  useEffect(() => {
    // 可以手动在此预加载指定的模块：
    //Features.preload(); // 预加载Features页面
    //Test.preload(); // 预加载Test页面
    // 也可以直接预加载所有的异步模块
    // Loadable.preloadAll();
  }, []);

  /** 简单权限控制 **/
  function handleEnter(Component, props) {
    // 例子：如果没有登录，直接跳转至login页
    // if (sessionStorage.getItem('userInfo')) {
    //   return <Component {...props} />;
    // } else {
    //   return <Redirect to='/login' />;
    // }
    return <Component {...props} />;
  }

  return (
    <ConfigProvider locale={zhCN}>
      <>
        <Router>
          <Route
            render={() => {
              return (
                <>
                  <Switch>
                    <Redirect exact from="/" to="/home" />
                    <Route path="/home" render={props => handleEnter(Home, props)} />
                    <Route path="/features" render={props => handleEnter(Features, props)} />
                    <Route path="/test" render={props => handleEnter(Test, props)} />
                    <Route path="/testclass" render={props => handleEnter(TestClass, props)} />
                    <Route component={NotFound} />
                  </Switch>
                  <Menu />
                </>
              );
            }}
          />
        </Router>
        <Footer />
      </>
    </ConfigProvider>
  );
}

export default connect(
  state => ({}),
  dispatch => ({
    actions: {},
  }),
)(RootRouterContainer);
