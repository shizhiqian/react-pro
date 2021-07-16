import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';
import { Layout } from 'antd';
import { History } from 'history';
import Header from '@/components/Header';
import SiderMenu from '@/components/SiderMenu';
import Footer from '@/components/Footer';
import { Dispatch } from '@/store';
import { convertLoadableRoute } from '@/utils/utils';
import routeConfig from './routeConfig';
import styles from './BasicLayout.less';

const routeMap = routeConfig.filter(item => item.path === '/')?.[0]?.routes || [];
type IProps = {
  history: History;
  location: Location;
};
const { Content } = Layout;

function BasicLayout(props: IProps): JSX.Element {
  const { history, location } = props;
  const dispatch = useDispatch<Dispatch>();
  const userInfo = useSelector((state: any) => state.global.userInfo);
  const [collapsed, setCollapsed] = useState(false); // 菜单栏是否收起
  const [route, setRoute] = useState([]); // 路由
  useEffect(() => {
    const routes = convertLoadableRoute(routeMap);
    // @ts-ignore
    setRoute(routes);
  }, []);

  // 退出登录
  const handleLogout = async (): Promise<void> => {
    await dispatch.global.fetchLogout({
      callback: () => {
        history.push('/user/login');
      },
    });
  };

  const handleEnter = useCallback(
    (Component, props) => {
      return <Component {...props} />;
    },
    [userInfo],
  );

  return (
    <Layout className={styles.layout} hasSider>
      <SiderMenu menus={routeMap} collapsed={collapsed} location={location} history={history} />
      <Layout>
        <Header
          collapsed={collapsed}
          userInfo={userInfo}
          onToggle={() => setCollapsed(!collapsed)}
          onLogout={handleLogout}
        />
        <Content className={styles.content}>
          <CacheSwitch>
            {route.map((item: any) => {
              const { path, redirect, component } = item;
              if (redirect) {
                return <Redirect key={path} exact from={path} to={redirect} />;
              }
              if (component) {
                if (path) {
                  return (
                    <CacheRoute
                      key={path}
                      exact
                      path={path}
                      render={props => handleEnter(component, props)}
                    />
                  );
                }
                return <Route key="no_path" component={component} />;
              }
              return null;
            })}
          </CacheSwitch>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
}

export default BasicLayout;
