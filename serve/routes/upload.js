const router = require('koa-router')();
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

router.post('/upload', async (ctx, next) => {
  try {
    const file = ctx.request.files.file; // 获取上传文件
    const {
      originalFilename: name,
      filepath: filePath,
      size,
      mimetype: type,
    } = ctx.request.files.file;

    console.log('file', file);

    const reader = fs.createReadStream(filePath); // 创建可读流
    const ext = name.split('.').pop(); // 获取上传文件扩展名
    const file_path = `/images/${Date.now()}_${name}`;
    const upStream = fs.createWriteStream(`public` + file_path); // 创建可写流
    reader.pipe(upStream); // 可读流通过管道写入可写流

    ctx.body = {
      name, // 文件名称
      path: file_path, // 临时路径
      size, // 文件大小
      type, // 文件类型
    };
  } catch (error) {
    ctx.body = {
      status: '0',
      message: error.message,
    };
  }
});

// 根据token获取当前登录的用户名
function getCurrentUser(auth) {
  auth = auth.replace('Bearer ', '');
  return jwt.verify(auth, 'feiyan-token');
}

module.exports = router;
