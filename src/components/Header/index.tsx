import React, { useCallback } from 'react';
import { Layout, Menu, Dropdown, Spin } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import styles from './index.less';

const { Header } = Layout;

interface IProps {
  collapsed: boolean;
  userInfo: any;
  onToggle: () => void;
  onLogout: () => void;
}

export default function HeaderComponent(props: IProps): JSX.Element {
  const { userInfo, collapsed, onToggle, onLogout } = props;
  const { username } = userInfo;
  const handleClickMenu = useCallback(
    e => {
      if (e.key === 'logout') {
        onLogout();
      }
    },
    [props],
  );

  return (
    <Header className={styles.layout}>
      <div className={styles.left}>
        <div className={styles.menuToggle} onClick={() => onToggle()}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
      </div>

      <div className={styles.right}>
        {username ? (
          <Dropdown
            placement="bottomRight"
            overlay={
              <Menu className={styles.dropdown} onClick={handleClickMenu}>
                <Menu.Item key="logout">
                  <LogoutOutlined />
                  退出登录
                </Menu.Item>
              </Menu>
            }
          >
            <div className={styles.user}>
              <UserOutlined />
              <span className={styles.name}>{username}</span>
            </div>
          </Dropdown>
        ) : (
          <div className={styles.loading}>
            <Spin spinning />
          </div>
        )}
      </div>
    </Header>
  );
}
