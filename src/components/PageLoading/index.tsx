import React from 'react';
import { Spin } from 'antd';
import styles from './index.less';

export default function PageLoading(): JSX.Element {
  return (
    <div className={styles.layout}>
      <Spin size="large" />
    </div>
  );
}
