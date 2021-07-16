import React from 'react';
import { Layout } from 'antd';
import styles from './index.less';

const { Footer } = Layout;

export default function FooterComponent(): JSX.Element {
  return <Footer className={styles.layout}>© 2020-{new Date().getFullYear()} 版权所有</Footer>;
}
