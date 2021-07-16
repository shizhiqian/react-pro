import React from 'react';
import loadable from '@loadable/component';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import PageLoading from '@/components/PageLoading';
import Footer from '@/components/Footer';
import styles from './UserLayout.less';

const { Content } = Layout;

const [NotFound, Login] = [() => import('../pages/404'), () => import('../pages/Login')].map(
  item => {
    return loadable(item, {
      fallback: <PageLoading />,
    });
  },
);

export default function UserLayout(): JSX.Element {
  return (
    <Layout className={styles.layout}>
      <Content>
        <Switch>
          <Redirect exact from="/user" to="/user/login" />
          <Route exact path="/user/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Content>
      <Footer />
    </Layout>
  );
}
