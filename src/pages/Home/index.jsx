import React from 'react';
// import { connect } from 'react-redux';
import { Button } from 'antd';
import ImgLogo from '@/assets/react-logo.jpg';
// import '@/assets/font/iconfont.css';
import './i.css';
import styles from './index.less'
import red from './red.css'
// import "./one.less"
import './one.less'





function HomePageContainer() {
  return (
    <div className={styles.layout}>
      <Button type="primary">Primary Button</Button>
      {/*<span className="iconfont icon-anquan"></span>*/}
      <div className="one">one</div>
      <div className={red.red}>red23</div>
      <div className="i">njj732222222</div>
      {/*<div>{ddd}</div>*/}
      <div className="box">
        <img src={ImgLogo} />
        <div className="title">React-Luo</div>
        <div className="info">react17、redux4、router5、webpack5、eslint、babel7、antd43322223</div>
      </div>
    </div>
  );
}
export default HomePageContainer;
// export default connect(
//   state => {
//     return {};
//   },
//   dispatch => ({
//     actions: {},
//   }),
// )(HomePageContainer);
