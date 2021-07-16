import React, { useMemo } from 'react';
import { Breadcrumb } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { IMenu } from '@/models/index.type';
import './index.less';

interface Props {
  location: Location;
  menus: IMenu[];
}

export default function Bread(props: Props): JSX.Element {
  /** 根据当前location动态生成对应的面包屑 **/
  const breads = useMemo(() => {
    const paths: string = props.location.pathname;
    const breads: JSX.Element[] = [];

    let parentId: number | null = null;
    do {
      const pathObj: IMenu | undefined = props.menus.find(
        v => v.id === parentId || v.url === paths,
      );

      if (pathObj) {
        breads.push(<Breadcrumb.Item key={pathObj.id}>{pathObj.title}</Breadcrumb.Item>);
        parentId = pathObj.parent;
      } else {
        parentId = null;
      }
    } while (parentId);

    breads.reverse();
    return breads;
  }, [props.location.pathname, props.menus]);

  return (
    <div className="bread">
      <EnvironmentOutlined className="icon" />
      <Breadcrumb>{breads}</Breadcrumb>
    </div>
  );
}
