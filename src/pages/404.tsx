import React from 'react';
import { Button, Result } from 'antd';

const NoFoundPage = (props: any): JSX.Element => {
  const handleToHome = () => {
    props.history.push('/');
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
