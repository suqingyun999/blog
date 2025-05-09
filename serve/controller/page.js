const jwt = require("jsonwebtoken");
const db = require("../db/index");
const dayjs = require("dayjs");
const { log } = require("debug/src/browser");

// 根据token获取当前登录的用户名
function getCurrentUser(auth) {
  auth = auth.replace("Bearer ", "");
  return jwt.verify(auth, "baixuege-token");
}

// 获取首页详情 - 页面
const pageHomeDetail = async (ctx, next) => {
  try {
    const sql = `select * from home`;
    const res = await db.query(sql);
    if (res.length) {
      ctx.body = {
        status: "1",
        message: "获取成功",
        data: res[0],
      };
    } else {
      ctx.body = {
        status: "0",
        message: "获取失败",
      };
    }
  } catch (error) {
    ctx.body = {
      status: "0",
      message: error.message,
    };
  }
};

// 获取文章列表
const pageContentList = async (ctx, next) => {
  const {
    page,
    // data: { title, time, status },
  } = ctx.request.body;

  try {
    const res = await db.query(
      `select count(*) as total from content where is_del=0`
    );

    console.log(page);

    const total = res[0].total; // 总数
    const pageSize = page.pageSize; // 每页条数
    const current = page.current; //当前页数
    const pages = Math.ceil(total / pageSize); // 总页数

    console.log("total", res[0]);

    let sql = `select * from content where is_del='0' order by datetime desc limit ${
      (current - 1) * pageSize
    },${pageSize}`;

    console.log(sql);

    const result = await db.query(sql);

    console.log(result);

    if (result) {
      ctx.body = {
        status: "1",
        message: "获取成功",
        data: {
          page: {
            current,
            pageSize,
            pages,
            total,
          },
          data: result.map((item) => {
            return {
              ...item,
              datetime: dayjs(item.datetime).format("YYYY-MM-DD HH:mm:ss"),
            };
          }),
        },
      };
    } else {
      ctx.body = {
        status: "0",
        message: "获取失败",
      };
    }
  } catch (error) {
    ctx.body = {
      status: "0",
      message: error.message,
    };
  }
};

// 获取文章详情
const pageContentDetail = async (ctx, next) => {
  try {
    const { id } = ctx.request.query;
    console.log("id", id);

    const sql = `select * from content where id='${id}'`;

    const res = await db.query(sql);

    if (res.length) {
      ctx.body = {
        status: "1",
        message: "获取成功",
        data: res[0],
      };
    } else {
      ctx.body = {
        status: "0",
        message: "获取失败",
      };
    }
  } catch (error) {
    ctx.body = {
      status: "0",
      message: error.message,
    };
  }
};

// 获取关于详情
const pageAboutDetail = async (ctx, next) => {
  try {
    const sql = `select * from about`;

    const res = await db.query(sql);

    if (res.length) {
      ctx.body = {
        status: "1",
        message: "获取成功",
        data: res[0],
      };
    } else {
      ctx.body = {
        status: "0",
        message: "获取失败",
      };
    }
  } catch (error) {
    ctx.body = {
      status: "0",
      message: error.message,
    };
  }
};

// 获取留言列表
const pageMessageList = async (ctx, next) => {
  const {
    page,
    // data: { title, time, status },
  } = ctx.request.body;

  console.log(page);

  try {
    const res = await db.query(
      `select count(*) as total from message where is_del=0`
    );
    const total = res[0].total; // 总数
    const pageSize = page.pageSize; // 每页条数
    const current = page.current; //当前页数
    const pages = Math.ceil(total / pageSize); // 总页数

    console.log("total", res[0]);

    let sql = `select * from message where is_del='0' order by datetime desc limit ${
      (current - 1) * pageSize
    },${pageSize}`;

    console.log(sql);

    const result = await db.query(sql);

    console.log(result);

    if (result) {
      ctx.body = {
        status: "1",
        message: "获取成功",
        data: {
          page: {
            current,
            pageSize,
            pages,
            total,
          },
          data: result.map((item) => {
            return {
              ...item,
              datetime: dayjs(item.datetime).format("YYYY-MM-DD HH:mm:ss"),
            };
          }),
        },
      };
    } else {
      ctx.body = {
        status: "0",
        message: "获取失败",
      };
    }
  } catch (error) {
    ctx.body = {
      status: "0",
      message: error.message,
    };
  }
};

// 新增留言
const pageMessageAdd = async (ctx, next) => {
  try {
    const { name, datetime, msg, color } = ctx.request.body;

    // const author_name = getCurrentUser(ctx.header.authorization).nickname;
    // const author = getCurrentUser(ctx.header.authorization).id;

    const sql = `insert into message (name, datetime, msg,color) values ('${name}','${datetime}','${msg}','${color}')`;
    console.log(sql);

    const res = await db.query(sql);
    console.log(res);

    if (res) {
      ctx.body = {
        status: "1",
        message: "新增成功",
      };
    } else {
      ctx.body = {
        status: "0",
        message: "新增失败",
      };
    }
  } catch (error) {
    ctx.body = {
      status: "0",
      message: error.message,
    };
  }
};

module.exports = {
  pageHomeDetail,
  pageContentList,
  pageContentDetail,
  pageMessageList,
  pageAboutDetail,
  pageMessageAdd,
};
