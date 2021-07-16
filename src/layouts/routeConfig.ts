// 菜单
interface IMenu {
  path?: string; // url，必须以斜杠开头
  name?: string; // 菜单名称
  component?: string; // 组件地址，必须以斜杠开头,以src/pages为根目录
  redirect?: string; // 重定向，必须以斜杠开头
  icon?: string; // 图标
  routes?: IMenu[];
}

const routeConfig: IMenu[] = [
  {
    path: '/user',
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        path: '/user/login',
        name: '登录',
        component: '/Login',
      },
      {
        component: '/404',
      },
    ],
  },
  {
    path: '/',
    routes: [
      {
        path: '/',
        redirect: '/home',
      },
      {
        name: '首页',
        path: '/home',
        icon: 'HomeOutlined',
        component: '/Home',
      },
      {
        name: '系统管理',
        path: '/system',
        icon: 'SettingOutlined',
        routes: [
          {
            name: '用户管理',
            path: '/system/user',
            component: '/System/User',
          },
          {
            name: '角色管理',
            path: '/system/role',
            component: '/System/Role',
          },
          {
            name: '菜单管理',
            path: '/system/menu',
            component: '/System/Menu',
          },
        ],
      },
      {
        name: '报表管理',
        path: '/report',
        icon: 'LineChartOutlined',
        routes: [
          {
            name: '收入报表',
            path: '/report/income',
            component: '/Report/Income',
          },
          {
            name: '日报表',
            path: '/report/daily',
            component: '/Report/Daily',
          },
        ],
      },
      {
        component: '/404',
      },
    ],
  },
];
export default routeConfig;
