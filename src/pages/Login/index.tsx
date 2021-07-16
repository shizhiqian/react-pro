import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import { vRequired, vMax, vAllSpace } from '@/utils/validate';
import { Dispatch } from '@/store';
import LogoImg from '@/assets/logo.png';
import styles from './index.less';

const FormItem = Form.Item;
const initialValues = {
  username: 'admin',
  password: '123456',
};

function Login(props: any): JSX.Element {
  const dispatch = useDispatch<Dispatch>();
  const submitting = useSelector((state: any) => state.loading.effects.global.fetchLogin);
  const [form] = Form.useForm();
  const handleFinish = async (): Promise<void> => {
    const values = await form.validateFields();
    const { data } = await dispatch.global.fetchLogin(values);
    localStorage.setItem('userInfo', JSON.stringify(data));
    await dispatch.global.updateState({ userInfo: data });
    props.history.replace('/');
  };

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.title}>
          <img src={LogoImg} alt="logo" />
          <span>React</span>
        </div>
        <Form form={form} onFinish={handleFinish} initialValues={initialValues}>
          <FormItem name="username" rules={[vRequired('帐号'), vMax(20), vAllSpace()]}>
            <Input allowClear prefix={<UserOutlined />} size="large" placeholder="请输入账号" />
          </FormItem>
          <Form.Item name="password" rules={[vRequired('密码'), vMax(20), vAllSpace()]}>
            <Input.Password
              allowClear
              size="large"
              type="password"
              placeholder="请输入密码"
              prefix={<KeyOutlined />}
            />
          </Form.Item>
          <Button htmlType="submit" size="large" type="primary" loading={submitting} block>
            登录
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
