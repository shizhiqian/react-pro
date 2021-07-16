const express = require('express');
const router = require('./router');

const app = express();

app.use(express.json());
app.use('/', router);

app.listen('9083', () => {
  console.log('mock监听端口: 9083');
});
