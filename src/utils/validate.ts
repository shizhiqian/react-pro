/**
 * @author zhiqian_shi
 * @date 2021/7/7 20:38
 * @Description: 必填
 * @param {string} text 为空 提示语
 * @param {string} type 为空 提示的类型，2种：select、upload
 * @return {object} 返回一个对象，如{required: true, message: '请输入姓名！'}
 */
export const vRequired = (text?: string, type?: string) => {
  let prefix = '请输入';
  switch (type) {
    case 'select':
      prefix = '请选择';
      break;
    case 'upload':
      prefix = '请上传';
      break;
    default:
      break;
  }
  return {
    required: true,
    message: `${prefix}${text}！`,
  };
};

/**
 * @author zhiqian_shi
 * @date 2021/7/7 21:13
 * @Description: 最大长度
 * @param {number} max 不为空 长度
 * @return {object} 返回一个对象，如{max: 10, message: '不大于10个字符！'}
 */
export const vMax = (max: number) => ({
  max,
  message: `不大于${max}个字符！`,
});

/**
 * @author zhiqian_shi
 * @date 2021/7/7 21:21
 * @Description: 最小长度
 * @param {string} min 不为空 长度
 * @return {object} 返回一个对象，如{min: 10, message: '不少于10个字符！'}
 */
export const vMin = (min: number) => ({
  min,
  message: `不少于${min}个字符！`,
});

/**
 * @author zhiqian_shi
 * @date 2021/7/7 21:24
 * @Description: 不能包含空格
 * @return {object} 返回一个对象，如{validator: Promise}
 */
export const vAllSpace = () => {
  const validator = (_: any, value: any) => {
    if (/\s+/.test(value)) {
      return Promise.reject(new Error('不能包含空格！'));
    }
    return Promise.resolve();
  };
  return {
    validator,
  };
};

/**
 * 验证手机号
 */
export const vMobile = () => ({
  pattern: /^1[3456789]\d{9}$/,
  message: '手机号格式错误！',
});

// 密码校验规则
export const vPassword = () => ({
  pattern: /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{8,20}$/,
  message: '密码8-20位，含字母、数字、字符的任两种',
});

// 邮箱
export const vEmail = () => ({
  type: 'email',
  message: '邮箱格式错误！',
});

// 循环去掉首尾空格
export const loopTrimFormFields = (data: any, form: any) => {
  const obj = {};
  Object.entries(data).forEach(item => {
    const [key, value] = item;
    let params = {
      [key]: value,
    };
    if (typeof value === 'string') {
      // @ts-ignore
      item.value = value.replace(/(^\s*)|(\s*$)/g, '');
      params = {
        // @ts-ignore
        [key]: item.value,
      };
      form.setFieldsValue(params);
    }
    Object.assign(obj, params);
  });
  return obj;
};

// 金额的校验规则
export const vMoney = () => {
  const rule = {
    pattern: /(^[0-9]{1,13}$)|(^[0-9]{1,13}[.]{1}[0-9]{1,2}$)/,
    message: '请输入1～13位的正整数，保留2位小数！',
  };
  return rule;
};

// 只能输入数字的校验规则
export const vNumber = () => {
  const rule = {
    pattern: new RegExp(/^[0-9]\d*$/, 'g'),
    message: '请输入数字',
  };
  return rule;
};
