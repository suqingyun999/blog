# 我的博客

## 
务必先安装 node (版本22.11.0) 环境和 MySql (版本8.0.40) 数据库

## Page
页面文件

生产发布请修改 .env.production 文件
```js
# 生产环境地址
# VITE_APP_BASE_API = 此处为生产环境地址
```

## Manage

管理端

生产发布请修改 .env.production 文件
```js
# 生产环境地址
# VITE_APP_BASE_API = 此处为生产环境地址
```

## Serve

node服务端
请修改 db/index.js文件配置，数据库为自己数据库账号密码配置

```js
const mysqlConfig = {
  user: "root",
  password: "12341234",
  database: "blog",
  host: "127.0.0.1",
};
```
数据库请使用提供的 sql 脚本生成数据库，导出的数据库脚本包含本地测试的图片路径和数据，请在生成后清空数据库，使用自己的文件数据。