import axios from 'axios';
import { notification } from 'antd';
// axios官网：https://axios-http.com/zh/docs/intro

/**
 * @author zhiqian_shi
 * @date 2021/7/8 14:30
 * @Description: 定义状态码的描述
 */
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

interface IConfig {
  isErrorIntercept?: boolean;
  isErrorShow?: boolean;
}

// 设置请求超时毫秒数，默认值是 `0` (永不超时)，如10 * 1000
axios.defaults.timeout = 0;
axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 检查token
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

/**
 * @author zhiqian_shi
 * @date 2021/7/8 14:14
 * @Description: 响应拦截器，http状态码为200~299会执行，依次执行下面
 * ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
 * -- 判断状态码为200
 *   ｜-- 判断 isErrorIntercept = true
 *       ｜-- 接口中 success = true，return response
 *       ｜-- 接口中 success = false
 *           ｜-- 判断 isErrorShow = true，throw response
 *           ｜-- 判断 isErrorShow = false，不做处理
 *   ｜-- 判断 isErrorIntercept = false，return response
 * ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
 * ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
 * -- 处理异常
 *   ｜-- 判断 isErrorShow 为 true，显示错误内容
 *   ｜-- 判断 isErrorShow 为 false，不显示错误内容
 * ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
 */
axios.interceptors.response.use(
  response => {
    const { status, data, config } = response || {};
    if (status === 200) {
      const isErrorIntercept = (config as any)?.isErrorIntercept === true;
      const isErrorShow = (config as any)?.isErrorShow === true;
      if (isErrorIntercept) {
        if (data?.success) {
          return response;
        }
        if (isErrorShow) {
          throw new Error(data?.errorMsg);
        }
      }
      return response;
    }
    throw new Error(codeMessage[status]);
  },
  error => {
    const { status, statusText } = error?.response || {};
    throw new Error(codeMessage[status] || statusText);
  },
);

/**
 * @author zhiqian_shi
 * @date 2021/7/8 14:13
 * @Description: 处理异常
 * @param {*} error 不为空 错误信息
 * @return {*} null
 */
const handleError = (error: any): void => {
  const { message } = error;
  notification.error({
    message: '通知',
    description: message || '发现一个未知的错误，请联系网站管理员！',
  });
};

/**
 * @author zhiqian_shi
 * @date 2021/7/8 10:16
 * @Description: post请求
 * @param {string} url 不为空 接口地址
 * @param {object} params 可为空 参数
 * @param {object} config 可为空 isErrorIntercept是否拦截后端返回的错误内容（默认true），isErrorShow是否提示错误内容（默认true）
 * @return {promise} 返回promise
 */
const post = (url: string, params?: Record<string, any>, config?: IConfig): Promise<any> => {
  const configs = {
    isErrorIntercept:
      typeof config?.isErrorIntercept === 'boolean' ? config.isErrorIntercept : true,
    isErrorShow: typeof config?.isErrorShow === 'boolean' ? config.isErrorShow : true,
  };
  return new Promise((resolve, reject) => {
    axios
      // @ts-ignore
      .post(url, params, configs)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        handleError(err);
        reject();
      });
  });
};

export default {
  post,
};
