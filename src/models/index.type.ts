// 菜单添加，修改时的参数类型
export interface IMenuParam {
  id?: number; // ID,添加时可以没有id
  title: string; // 标题
  icon: string; // 图标
  url: string; // 链接路径
  parent: number | null; // 父级ID
  desc: string; // 描述
  sorts: number; // 排序编号
  conditions: number; // 状态，1启用，-1禁用
  children?: IMenu[]; // 子菜单
}

// 菜单对象
export interface IMenu extends IMenuParam {
  id: number; // ID
}

// 菜单id和权限id
export interface IMenuAndPower {
  menuId: number; // 菜单ID
  powers: number[]; // 该菜单拥有的所有权限ID
}

// 角色添加和修改时的参数类型
export interface IRoleParam {
  id?: number; // ID,添加时可以不传id
  title: string; // 角色名
  desc: string; // 描述
  sorts: number; // 排序编号
  conditions: number; // 状态，1启用，-1禁用
  menuAndPowers?: IMenuAndPower[]; // 添加时可以不传菜单和权限
}

// 角色对象
export interface IRole extends IRoleParam {
  id: number; // ID
  menuAndPowers: IMenuAndPower[]; // 当前角色拥有的菜单id和权限id
}

// 权限添加修改时的参数类型
export interface IPowerParam {
  id?: number; // ID, 添加时可以没有id
  menu: number; // 所属的菜单
  title: string; // 标题
  code: string; // CODE
  desc: string; // 描述
  sorts: number; // 排序
  conditions: number; // 状态 1启用，-1禁用
}

// 权限对象
export interface IPower extends IPowerParam {
  id: number; // ID
}

// 用户数据类型
export interface IUserInfo {
  userBasicInfo: IUserBasicInfo | null; // 用户的基本信息
  menus: IMenu[]; // 拥有的所有菜单对象
  roles: IRole[]; // 拥有的所有角色对象
  powers: IPower[]; // 拥有的所有权限对象
}

// 用户的基本信息
export interface IUserBasicInfo {
  id: number; // ID
  username: string; // 用户名
  password: string | number; // 密码
  phone: string | number; // 手机
  email: string; // 邮箱
  desc: string; // 描述
  conditions: number; // 状态 1启用，-1禁用
  roles: number[]; // 拥有的所有角色ID
}

// 添加修改用户时参数的数据类型
export interface IUserBasicInfoParam {
  id?: number; // ID
  username: string; // 用户名
  password: string | number; // 密码
  phone?: string | number; // 手机
  email?: string; // 邮箱
  desc?: string; // 描述
  conditions?: number; // 状态 1启用，-1禁用
}

export interface IPowerTree extends IMenu {
  powers: IPower[];
}

// ./global.js的state类型
export interface IAppState {
  userInfo: IUserInfo;
  powersCode: string[];
}

// ./sys.js的state类型
export interface ISysState {
  menus: IMenu[];
  roles: IRole[];
  powerTreeData: IPowerTree[];
}

// 接口的返回值类型
export type IRes =
  | {
      status: number; // 状态，200成功
      data?: any; // 返回的数据
      message?: string; // 返回的消息
    }
  | undefined;
