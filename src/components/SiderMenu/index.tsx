import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { History } from 'history';
import ImgLogo from '@/assets/logo.png';
import Icon from '@/components/Icon';
import { deepClone } from '@/utils/utils';
import styles from './index.less';

interface IProps {
  collapsed: boolean;
  history: History;
  location: Location;
  menus: any;
}
const { Sider } = Layout;
const { SubMenu, Item } = Menu;

export default function SiderMenu(props: IProps): JSX.Element {
  const { location, history, collapsed, menus } = props;
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
      const { __menuname } = e?.item?.props;
      document.title = `${__menuname}__React-Pro`;
      history.push(e.key);
    },
    [history],
  );

  const menuTreeRender = useCallback((data: any[]): (JSX.Element | null)[] => {
    return data.map((item: any) => {
      if (item.routes) {
        return (
          <SubMenu
            key={item.path}
            title={
              item.icon ? (
                <span>
                  <Icon type={item.icon} />
                  <span>{item.name}</span>
                </span>
              ) : (
                item.name
              )
            }
          >
            {menuTreeRender(item.routes)}
          </SubMenu>
        );
      }
      if (item.name) {
        return (
          <Item
            key={item.path}
            // @ts-ignore
            __menuname={item.name}
          >
            {item.icon ? <Icon type={item.icon} /> : null}
            <span>{item.name}</span>
          </Item>
        );
      }
      return null;
    });
  }, []);

  const menuRender: (JSX.Element | null)[] = useMemo(() => {
    const clone = deepClone(menus);
    return menuTreeRender(clone);
  }, []);

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
