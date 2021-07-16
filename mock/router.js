const express = require('express');
const router = express.Router();
const Mock = require('mockjs');
// // 'name|min-max': string
// 'dataSource|1-9': [
//   {
//     // 属性 id 是一个自增数，起始值为 1，每次增 1
//     'id|+1': 1,
//     // 'name|count': string
//     'mockTitle|1': ['肆无忌惮'],
//     // 'name|min-max.dmin-dmax': number
//     'number|1-100.1-10': 1,
//     // 'name|min-max': boolean
//     'boolean|1-2': true,
//     'mockContent|1': [
//       '角色精湛主题略荒诞',
//       '理由太短 是让人不安',
//       '疑信参半 却无比期盼',
//       '你的惯犯 圆满',
//       '别让纠缠 显得 孤单',
//     ],
//     'mockAction|1': ['下载', '试听', '喜欢'],
//   },
// ],
router.post('/api/login', (req, res) => {
  const { username } = req.body;
  setTimeout(() => {
    res.status(200).send(
      Mock.mock({
        success: true,
        errorMsg: null,
        errorCode: null,
        data: {
          username,
        },
      }),
    );
  }, 0);
});

router.post('/api/logout', (req, res) => {
  setTimeout(() => {
    res.status(200).send(
      Mock.mock({
        success: true,
      }),
    );
  }, 0);
});

module.exports = router;
