# 我的博客

## 
务必先安装 node(版本22.11.0) 环境和 MySql(版本8.0.40) 数据库

## Page
页面文件


## Manage

管理端

## Serve

node服务端
请修改 db/index.js文件配置数据库为自己数据库账号密码配置

```js
const mysqlConfig = {
  user: "root",
  password: "12341234",
  database: "blog",
  host: "127.0.0.1",
};
```
