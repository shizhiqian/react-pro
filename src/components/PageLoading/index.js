import React from 'react';
import { Spin, Button, Result } from 'antd';
import styles from './index.less';

export default function PageLoading({ error, timedOut, pastDelay }) {
  const handleRefresh = () => {
    window.location.reload();
  };

  const renderState = () => {
    let node;
    if (error) {
      node = (
        <Result
          status="error"
          title="加载出错，请刷新页面"
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
