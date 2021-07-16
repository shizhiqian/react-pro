import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';
import Footer from '@/components/Footer';
import { convertLoadableRoute } from '@/utils/utils';
import routeConfig from './routeConfig';
import styles from './UserLayout.less';

const { Content } = Layout;

export default function UserLayout(): JSX.Element {
  const [route, setRoute] = useState([]); // 路由

  useEffect(() => {
    const routeMap = routeConfig.filter(item => item.path === '/user')?.[0]?.routes || [];
    const routes = convertLoadableRoute(routeMap);
    // @ts-ignore
    setRoute(routes);
  }, []);

  return (
    <Layout className={styles.layout}>
      <Content>
        <CacheSwitch>
          {route.map((item: any) => {
            const { path, redirect, component } = item;
            if (redirect) {
              return <Redirect key={path} exact from={path} to={redirect} />;
            }
            if (component) {
              if (path) {
                return <CacheRoute key={path} exact path={path} component={component} />;
              }
              return <CacheRoute key="no_path" component={component} />;
            }
            return null;
          })}
        </CacheSwitch>
      </Content>
      <Footer />
    </Layout>
  );
}
