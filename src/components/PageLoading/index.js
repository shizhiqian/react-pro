import React from 'react';
import { Spin, Button, Result } from 'antd';
import styles from './index.less';

export default function PageLoading({ error, timedOut, pastDelay }) {
  const handleRefresh = () => {
    window.location.reload();
  };

  const renderState = () => {
    let node;
    // console.log(error);
    // console.log(1111);
    if (error) {
      node = (
        <Result
          status="error"
          title="页面加载出错，请尝试刷新页面"
          extra={
            <Button type="primary" onClick={handleRefresh}>
              刷新
            </Button>
          }
        />
      );
    } else if (timedOut) {
      node = (
        <Result
          status="warning"
          title="加载超时，请刷新页面"
          extra={
            <Button type="primary" onClick={handleRefresh}>
              刷新
            </Button>
          }
        />
      );
    } else if (pastDelay) {
      node = <Spin size="large" />;
    } else {
      node = <Spin size="large" />;
    }
    return node;
  };

  return <div className={styles.layout}>{renderState()}</div>;
}
