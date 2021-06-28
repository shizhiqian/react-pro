// 支持es的最新特性的api垫片（polyfill），在babel之前版本在用
// @babel/polyfill
// 从7.4.0版本后就用core-js代替了polyfill
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '@/store';
import Routers from './Routers';
import './index.less';

const App = () => {
  return (
    <Provider store={store}>
      <Routers />
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
