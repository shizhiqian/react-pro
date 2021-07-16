import React from 'react';
import Icon, { createFromIconfontCN } from '@ant-design/icons';
import * as svgMap from './svg';
const AntDesignIconMap = require('@ant-design/icons');

interface IProps {
  type: string;
}

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_1688075_vwak21i2wxj.js', // 自定义，在 iconfont.cn 上生成
  ],
});

/**
 * @author zhiqian_shi
 * @date 2021/7/15 09:20
 * @Description: 适用于菜单的图标、自定义的图标
 * @param {string} type 不为空 icon的类型
 * @return {string} 返回图标
 */
export default function Icons(props: IProps): JSX.Element | null {
  const { type } = props;
  if (!type) {
    return null;
  }
  const AntDesignIcon: any = AntDesignIconMap[type];
  const svgIcon: any = svgMap[type];
  let icon: JSX.Element;

  if (AntDesignIcon) {
    // 组件库自带的图标，https://ant.design/components/icon-cn/
    icon = <AntDesignIcon />;
  } else if (svgIcon) {
    // svg图标，/src/components/Icon/svg
    icon = <Icon component={svgIcon} />;
  } else {
    // 在 iconfont.cn 上自行管理的图标
    icon = <IconFont type={type} />;
  }
  return icon;
}
