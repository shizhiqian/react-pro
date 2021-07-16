import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';
import loadable from '@loadable/component';
import { Layout, message } from 'antd';
import Header from '@/components/Header';
import { History } from 'history';
import SiderMenu from '@/components/SiderMenu';
import Footer from '@/components/Footer';
import PageLoading from '@/components/PageLoading';
// import Bread from "@/components/Bread";
import BreadTab from '@/components/BreadTab'; // Tab方式的导航
import tools from '@/utils/tools';
import { Dispatch } from '@/store';
import './BasicLayout.less';

const { Content } = Layout;
export const [NotFound, Home] = [
  () => import('../pages/404'),
  () => import('../pages/Home'),
  () => import('../pages/Home'),
].map(item => {
  return loadable(item as any, {
    fallback: <PageLoading />,
  });
});

type IProps = {
  history: History;
  location: Location;
};

function BasicLayout(props: IProps): JSX.Element {
  const { history, location } = props;
  const dispatch = useDispatch<Dispatch>();
  const userInfo = useSelector((state: any) => state.global.userInfo);
  const [collapsed, setCollapsed] = useState(false); // 菜单栏是否收起

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
    <Layout className="page-basic" hasSider>
      <SiderMenu collapsed={collapsed} location={location} history={history} />
      <Layout>
        <Header
          collapsed={collapsed}
          userInfo={userInfo}
          onToggle={() => setCollapsed(!collapsed)}
          onLogout={handleLogout}
        />
        {/* 普通面包屑导航 */}
        {/*<Bread menus={userInfo.menus} location={props.location} />*/}
        {/* Tab方式的导航 */}
        {/*<BreadTab menus={userInfo.menus} location={props.location} history={props.history} />*/}
        <Content className="content">
          <CacheSwitch>
            <Redirect exact from="/" to="/home" />
            <CacheRoute exact path="/home" render={props => handleEnter(Home, props)} />

            {/*<Route exact path="/system/menuadmin" render={props => handleEnter(MenuAdmin, props)} />*/}
            {/*<Route exact path="/system/poweradmin" render={props => handleEnter(PowerAdmin, props)} />*/}
            {/*<Route exact path="/system/roleadmin" render={props => handleEnter(RoleAdmin, props)} />*/}
            {/*<CacheRoute*/}
            {/*  exact*/}
            {/*  path="/system/useradmin"*/}
            {/*  render={props => handleEnter(UserAdmin, props)}*/}
            {/*/>*/}
            {/*<Route exact path="/nopower" component={NoPower} />*/}
            <Route component={NotFound} />
          </CacheSwitch>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
}

export default BasicLayout;
