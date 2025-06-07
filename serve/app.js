const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const koajwt = require("koa-jwt");
const koaBody = require("koa-body");
const cors = require("koa2-cors"); //跨域
const path = require("path");

// 导入路由
const users = require("./routes/users");
const content = require("./routes/content");
const message = require("./routes/message");
const home = require("./routes/home");
const upload = require("./routes/upload");
const about = require("./routes/about");
const page = require("./routes/page");
const self = require("./routes/self");

// error handler
onerror(app);

// 中间件
// 解决跨域
app.use(
  cors({
    // 任何地址都可以访问
    origin: "*",
    maxAge: 2592000,
    credentials: true, //允许携带cookie
    allowMethods: ["GET", "POST", "DELETE", "OPTION"], //允许的请求方法
    allowHeaders: ["Content-Type", "Authorization", "Accept"], //允许的请求头
  })
);
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(logger());

// 静态资源目录
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "pug",
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// token
app.use(
  koajwt({
    // 加密的密钥
    secret: "blog-token",
  }).unless({
    // 不需要验证的路由
    path: [
      /^\/users\/login/,
      /^\/upload/,
       /^\/uploads/,
      /^\/public/,
      /^\/images/,
      /^\/page/,
      /^\/self/,
      /\/users\/userInfo/,
    ],
  })
);

// routes 路由
app.use(users.routes(), users.allowedMethods());
app.use(content.routes(), content.allowedMethods());
app.use(message.routes(), message.allowedMethods());
app.use(home.routes(), home.allowedMethods());
app.use(about.routes(), about.allowedMethods());
app.use(page.routes(), page.allowedMethods());
app.use(self.routes(), self.allowedMethods());

// 文件上传
app.use(
  koaBody({
    multipart: true,
  })
);

app.use(upload.routes(), upload.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
