import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { History } from 'history';
import ImgLogo from '@/assets/logo.png';
import Icon from '@/components/Icon';
import styles from './index.less';

interface IProps {
  collapsed: boolean;
  history: History;
  location: Location;
}
interface IMenu {
  title: string;
  url: string; // 以斜杠开头 /
  icon?: string;
  children?: IMenu[]; // 子菜单
}

const menuData: IMenu[] = [
  {
    title: '首页',
    url: '/home',
    icon: 'HomeOutlined', // 从这里获取：https://ant.design/components/icon-cn/
  },
  {
    title: '系统管理',
    url: '/system',
    icon: 'icon-setting',
    children: [
      {
        title: '用户管理',
        url: '/system/useradmin',
      },
      {
        title: '角色管理',
        url: '/system/roleadmin',
      },
      {
        title: '权限管理',
        url: '/system/poweradmin',
      },
      {
        title: '菜单管理',
        url: '/system/menuadmin',
      },
    ],
  },
];

const { Sider } = Layout;
const { SubMenu, Item } = Menu;

export default function SiderMenu(props: IProps): JSX.Element {
  const { location, history, collapsed } = props;
  const { pathname } = location;
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]); // 当前选中
  const [openKeys, setOpenKeys] = useState<string[]>([]); // 当前需要被展开的项

  useEffect(() => {
    const paths = pathname.split('/').filter(item => !!item);
    setSelectedKeys([pathname]);
    setOpenKeys(paths.map(item => `/${item}`));
  }, [location]);

  const onSelect = useCallback(
    e => {
      history.push(e.key);
    },
    [history],
  );

  const makeTreeDom = useCallback((data: IMenu[]): JSX.Element[] => {
    return data.map((item: IMenu) => {
      if (item.children) {
        return (
          <SubMenu
            key={item.url}
            title={
              item.icon ? (
                <span>
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
                </span>
              ) : (
                item.title
              )
            }
          >
            {makeTreeDom(item.children)}
          </SubMenu>
        );
      } else {
        return (
          <Item key={item.url}>
            {item.icon ? <Icon type={item.icon} /> : null}
            <span>{item.title}</span>
          </Item>
        );
      }
    });
  }, []);

  const menuRender: JSX.Element[] = useMemo(() => {
    const dom = makeTreeDom(menuData);
    return dom;
  }, [makeTreeDom]);

  return (
    <div className={styles.layout}>
      <Sider width={256} className={styles.sider} trigger={null} collapsible collapsed={collapsed}>
        <div
          className={classNames(styles.logo, {
            [styles.hide]: collapsed,
          })}
        >
          <Link className={styles.link} to="/">
            <img className={styles.img} src={ImgLogo} alt="logo" />
            <div className={styles.title}>React-Pro</div>
          </Link>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          {...(collapsed ? {} : { openKeys })}
          onOpenChange={(keys: any[]) => setOpenKeys(keys)}
          onSelect={onSelect}
        >
          {menuRender}
        </Menu>
      </Sider>
    </div>
  );
}
