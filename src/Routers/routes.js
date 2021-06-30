export const routes = [
  {
    path: '/',
    component: 'layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
          {
            path: '/',
            redirect: '/design/designer/list',
          },
        ],
      },
    ],
  },
];
