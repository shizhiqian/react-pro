// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
// 支持es的最新特性的api垫片（polyfill），在babel之前版本在用@babel/polyfill
// 从7.4.0版本后就用core-js代替了polyfill
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ErrorBoundary from '@/components/ErrorBoundary';
import store from '@/store';
import Router from '@/router';
import './index.less';

const Root = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

ReactDOM.render(
  <>
    <Root />
  </>,
  document.getElementById('root'),
);

if ((module as any).hot) {
  (module as any).hot.accept();
}
