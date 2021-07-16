/**
 * 基础model,系统权限相关功能
 * 在src/store/index.js 中被挂载到store上，命名为 sys
 * **/

import axios from '@/utils/axios'; // 自己写的工具函数，封装了请求数据的通用接口
// import qs from 'qs';
import { message } from 'antd';
import { Dispatch } from '@/store';

import {
  IMenu,
  IRole,
  IMenuParam,
  IPowerParam,
  IPowerTree,
  IRoleParam,
  ISysState,
  IRes,
  IUserBasicInfoParam,
} from './index.type';

const defaultState: ISysState = {
  menus: [], // 所有的菜单信息（用于菜单管理，无视权限）
  roles: [], // 所有的角色信息（用于Model赋予项，无视权限）
  powerTreeData: [], // 分配权限treeTable组件所需原始数据
};

export default {
  state: defaultState,
  reducers: {
    // 保存所有菜单数据
    reducerSetMenus(state: ISysState, payload: IMenu[]): ISysState {
      return { ...state, menus: payload };
    },
    // 保存所有角色数据
    reducerSetRoles(state: ISysState, payload: IRole[]): ISysState {
      return { ...state, roles: payload };
    },

    // 保存所有权限数据
    reducerSetAllPowers(state: ISysState, payload: IPowerTree[]): ISysState {
      return { ...state, powerTreeData: payload };
    },
  },

  effects: (dispatch: Dispatch) => ({
    // /**
    //  * 获取所有菜单
    //  * **/
    // async getMenus(): Promise<Res> {
    //   try {
    //     const res: IRes = await axios.get('/api/getmenus');
    //     if (res && res.status === 200) {
    //       dispatch.sys.reducerSetMenus(res.data);
    //     }
    //     return res;
    //   } catch (err) {
    //     message.error('网络错误，请重试');
    //   }
    //   return;
    // },
    // /**
    //  * 根据菜单ID获取对应的菜单信息
    //  * @param {number} id 可以是一个数字也可以是一个数组
    //  * **/
    // async getMenusById(params: { id: number | number[] }) {
    //   try {
    //     const res: IRes = await axios.post(`/api/getMenusById`, params);
    //     return res;
    //   } catch (err) {
    //     message.error('网络错误，请重试');
    //   }
    //   return;
    // },
    //
    // /**
    //  * 添加菜单
    //  * @param params MenuParam
    //  */
    // async addMenu(params: IMenuParam) {
    //   try {
    //     const res: IRes = await axios.post('/api/addmenu', params);
    //     return res;
    //   } catch (err) {
    //     message.error('网络错误，请重试');
    //   }
    //   return;
    // },
    // /**
    //  * 修改菜单
    //  * **/
    // async upMenu(params: IMenuParam) {
    //   try {
    //     const res: IRes = await axios.post('/api/upmenu', params);
    //     return res;
    //   } catch (err) {
    //     message.error('网络错误，请重试');
    //   }
    //   return;
    // },
    // /**
    //  * 删除菜单
    //  * **/
    // async delMenu(params: { id: number }) {
    //   try {
    //     const res: IRes = await axios.post('/api/delmenu', params);
    //     return res;
    //   } catch (err) {
    //     message.error('网络错误，请重试');
    //   }
    //   return;
    // },
    //
    // /**
    //  * 根据菜单ID查询其下的权限数据
    //  * **/
    // async getPowerDataByMenuId(params: { menuId: number | null }) {
    //   try {
    //     const res: IRes = await axios.get(`/api/getpowerbymenuid?${qs.stringify(params)}`);
    //     return res;
    //   } catch (err) {
    //     message.error('网络错误，请重试');
    //   }
    //   return;
    // },
    //
    // /**
    //  * 根据权限ID查询对应的权限数据
    //  * @param id 可以是一个数字也可以是一个数组
    //  * **/
    // async getPowerById(params: { id: number | number[] }) {
    //   try {
    //     const res: IRes = await axios.post(`/api/getPowerById`, params);
    //     return res;
    //   } catch (err) {
    //     message.error('网络错误，请重试');
    //   }
    //   return;
    // },
    //
    // /** 获取所有角色 **/
    // async getAllRoles(): Promise<Res> {
    //   try {
    //     const res: IRes = await axios.get('/api/getAllRoles');
    //     if (res && res.status === 200) {
    //       dispatch.sys.reducerSetRoles(res.data);
    //     }
    //     return res;
    //   } catch (err) {
    //     message.error('网络错误，请重试');
    //   }
    //   return;
    // },
    // /**
    //  * 添加权限
    //  * **/
    // async addPower(params: IPowerParam) {
    //   try {
    //     const res: IRes = await axios.post('/api/addpower', params);
    //     return res;
    //   } catch (err) {
    //     message.error('网络错误，请重试');
    //   }
    //   return;
    // },
    //
    // /**
    //  * 修改权限
    //  * **/
    // async upPower(params: IPowerParam) {
    //   try {
    //     const res: IRes = await axios.post('/api/uppower', params);
    //     return res;
    //   } catch (err) {
    //     message.error('网络错误，请重试');
    //   }
    //   return;
    // },
    //
    // /**
    //  * 删除权限
    //  * **/
    // async delPower(params: { id: number }) {
    //   try {
    //     const res: IRes = await axios.post('/api/delpower', params);
    //     return res;
    //   } catch (err) {
    //     message.error('网络错误，请重试');
    //   }
    //   return;
    // },
    //
    // /**
    //  * 分页查询角色数据
    //  * **/
    // async getRoles(params: {
    //   pageNum: number;
    //   pageSize: number;
    //   title?: string;
    //   conditions?: number;
    // }) {
    //   try {
    //     const res: IRes = await axios.get(`/api/getroles?${qs.stringify(params)}`);
    //     return res;
    //   } catch (err) {
    //     message.error('网络错误，请重试');
    //   }
    //   return;
    // },
    //
    // /**
    //  * 通过角色ID查询对应的角色数据
    //  * @param id 可以是一个数字，也可以是一个数组
    //  * @return 返回值是数组
    //  * **/
    // async getRoleById(params: { id: number | number[] }) {
    //   try {
    //     const res: IRes = await axios.post(`/api/getRoleById`, params);
    //     return res;
    //   } catch (err) {
    //     message.error('网络错误，请重试');
    //   }
    //   return;
    // },
    //
    // /**
    //  * 添加角色
    //  * **/
    // async addRole(params: IRoleParam) {
    //   try {
    //     const res: IRes = await axios.post('/api/addrole', params);
    //     return res;
    //   } catch (err) {
    //     message.error('网络错误，请重试');
    //   }
    //   return;
    // },
    // /**
    //  * 修改角色
    //  * **/
    // async upRole(params: IRoleParam) {
    //   try {
    //     const res: IRes = await axios.post('/api/uprole', params);
    //     return res;
    //   } catch (err) {
    //     message.error('网络错误，请重试');
    //   }
    //   return;
    // },
    //
    // /**
    //  * 删除角色
    //  * **/
    // async delRole(params: { id: number }) {
    //   try {
    //     const res: IRes = await axios.post('/api/delrole', params);
    //     return res;
    //   } catch (err) {
    //     message.error('网络错误，请重试');
    //   }
    //   return;
    // },
    //
    // /**
    //  * 通过角色ID查询该角色拥有的所有菜单和权限详细信息
    //  * **/
    // async findAllPowerByRoleId(params: { id: number }) {
    //   try {
    //     const res: IRes = await axios.get(`/api/findAllPowerByRoleId?${qs.stringify(params)}`);
    //     return res;
    //   } catch (err) {
    //     message.error('网络错误，请重试');
    //   }
    //   return;
    // },
    //
    // /**
    //  * 获取所有的菜单及权限详细信息
    //  * 如果你在sys.ts中引用了sys本身，则需要显式的注明返回值的类型
    //  * **/
    // async getAllMenusAndPowers(): Promise<Res> {
    //   try {
    //     const res: IRes = await axios.get(`/api/getAllMenusAndPowers`);
    //     if (res && res.status === 200) {
    //       dispatch.sys.reducerSetAllPowers(res.data);
    //     }
    //     return res;
    //   } catch (err) {
    //     message.error('网络错误，请重试');
    //   }
    //   return;
    // },
    //
    // /**
    //  * 通过角色ID给指定角色设置菜单及权限
    //  * **/
    // async setPowersByRoleId(params: { id: number; menus: number[]; powers: number[] }) {
    //   try {
    //     const res: IRes = await axios.post('/api/setPowersByRoleId', params);
    //     return res;
    //   } catch (err) {
    //     message.error('网络错误，请重试');
    //   }
    //   return;
    // },
    //
    // /**
    //  * (批量)通过角色ID给指定角色设置菜单及权限
    //  * @param params [{id,menus,powers},...]
    //  * */
    // async setPowersByRoleIds(
    //   params: {
    //     id: number;
    //     menus: number[];
    //     powers: number[];
    //   }[],
    // ) {
    //   try {
    //     const res: IRes = await axios.post('/api/setPowersByRoleIds', params);
    //     return res;
    //   } catch (err) {
    //     message.error('网络错误，请重试');
    //   }
    //   return;
    // },
    //
    // /**
    //  * 条件分页查询用户列表
    //  * **/
    // async getUserList(params: {
    //   pageNum: number;
    //   pageSize: number;
    //   username?: string;
    //   conditions?: number;
    // }) {
    //   try {
    //     const res: IRes = await axios.get(`/api/getUserList?${qs.stringify(params)}`);
    //     return res;
    //   } catch (err) {
    //     message.error('网络错误，请重试');
    //   }
    //   return;
    // },
    //
    // /**
    //  * 添加用户
    //  * **/
    // async addUser(params: IUserBasicInfoParam) {
    //   try {
    //     const res: IRes = await axios.post('/api/addUser', params);
    //     return res;
    //   } catch (err) {
    //     message.error('网络错误，请重试');
    //   }
    //   return;
    // },
    //
    // /**
    //  * 修改用户
    //  * **/
    // async upUser(params: IUserBasicInfoParam) {
    //   try {
    //     const res: IRes = await axios.post('/api/upUser', params);
    //     return res;
    //   } catch (err) {
    //     message.error('网络错误，请重试');
    //   }
    //   return;
    // },
    //
    // /**
    //  * 删除用户
    //  * **/
    // async delUser(params: { id: number }) {
    //   try {
    //     const res: IRes = await axios.post('/api/delUser', params);
    //     return res;
    //   } catch (err) {
    //     message.error('网络错误，请重试');
    //   }
    //   return;
    // },
    //
    // /**
    //  * 给用户分配角色
    //  * 用的也是upUser接口
    //  * **/
    // async setUserRoles(params: { id: number; roles: number[] }) {
    //   try {
    //     const res: IRes = await axios.post('/api/upUser', params);
    //     return res;
    //   } catch (err) {
    //     message.error('网络错误，请重试');
    //   }
    //   return;
    // },
  }),
};
