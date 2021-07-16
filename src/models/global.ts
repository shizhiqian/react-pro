import { createModel } from '@rematch/core';
import request from '@/utils/request';
import { RootModel } from './index';

export interface IState {
  userInfo: any;
}
const state: IState = {
  userInfo: {},
};
export default createModel<RootModel>()({
  state,
  reducers: {
    updateState(state: IState, payload: IState) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: dispatch => ({
    // 登录
    async fetchLogin(params: { username: string; password: string }) {
      // dispatch.global.userInfo.userBasicInfo = 3333;
      // dispatch.global.userInfo.userBasicInfo = 3333;
      // const data = 2;
      // dispatch.global.updateState({ roles: 4 });
      // this.updateState({ roles: 4 });
      // console.log(dispatch.global.updateState());
      // dispatch.global.updateState({ payload: { roles: 4 }});
      return await request.post('/api/login', params, {
        isInterceptError: true,
        isNoticeError: true,
      });
    },
    // 退出
    async fetchLogout(payload: { callback: any }) {
      const { callback } = payload;
      await request.post('/api/logout');
      localStorage.clear();
      sessionStorage.clear();
      callback();
    },
    // async incrementAsync(payload, state) {
    //   console.log("This is current root state", state);
    //   await new Promise((resolve) => setTimeout(resolve, 3000));
    //   dispatch.count.increment(1);
    // },
    // async incrementAsync2(payload, state) {
    //   console.log("This is current root state", state);
    //   await new Promise((resolve) => setTimeout(resolve, 3000));
    //   dispatch.count.increment(2);
    // },
  }),
});
