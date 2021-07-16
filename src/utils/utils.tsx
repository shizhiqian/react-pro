import React from 'react';
import loadable from '@loadable/component';
import PageLoading from '@/components/PageLoading';

// 深拷贝
export const deepClone = (data: any) => {
  const isArray = Array.isArray(data);
  const isObject = Object.prototype.toString.call(data) === '[object Object]';
  let obj;
  if (isArray) {
    obj = [];
  } else if (isObject) {
    obj = {};
  } else {
    return data;
  }
  if (isArray) {
    for (let i = 0, len = data.length; i < len; i += 1) {
      // @ts-ignore
      obj.push(deepClone(data[i]));
    }
  } else if (isObject) {
    for (const key in data) {
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
};

/**
 * @author zhiqian_shi
 * @date 2021/7/16 22:02
 * @Description: 转换按需加载的页面
 * @param {object} routeMap 不为空 原始菜单结构
 * @return {object} 返回包含路由组件的对象
 */
export const convertLoadableRoute = (routeMap: any[]) => {
  const routeComponents: any[] = [];
  const loop = (list: any[]) => {
    list.map(item => {
      const { routes, component, redirect } = item;
      if (routes) {
        const _item = deepClone(item);
        delete _item.routes;
        routeComponents.push(_item);
        loop(routes);
      } else if (component) {
        routeComponents.push({
          ...item,
          component: loadable(() => import(`@/pages${component}`), {
            fallback: <PageLoading />,
          }),
        });
      } else if (redirect) {
        routeComponents.push(item);
      }
    });
  };
  loop(routeMap);
  return routeComponents;
};
