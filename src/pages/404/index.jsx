import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Result } from 'antd';

const NoFoundPage = () => {
  const history = useHistory();
  const handleToHome = () => {
    history.push('/');
  };

  return (
    <Result
      status={404}
      title="404"
      subTitle="对不起，您访问的页面不存在。"
      extra={
        <Button type="primary" onClick={handleToHome}>
          返回首页
        </Button>
      }
    />
  );
};

export default NoFoundPage;
