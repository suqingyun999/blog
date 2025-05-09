const jwt = require("jsonwebtoken");
const db = require("../db/index");
const dayjs = require("dayjs");

// 根据token获取当前登录的用户名
function getCurrentUser(auth) {
  auth = auth.replace("Bearer ", "");
  return jwt.verify(auth, "blog-token");
}

// 获取留言列表
const messageList = async (ctx, next) => {
  const {
    page,
    // data: { title, time, status },
  } = ctx.request.body;

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
const messageAdd = async (ctx, next) => {
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

// 获取留言详情
const messageDetail = async (ctx, next) => {
  try {
    const { id } = ctx.request.query;
    console.log("id", id);

    const sql = `select * from message where id='${id}'`;

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

// 更新留言
const messageUpdate = async (ctx, next) => {
  try {
    const { id, name, datetime, msg, color } = ctx.request.body;

    const sql = `update message set name='${name}',msg='${msg}',datetime='${datetime}',color='${color}' where id='${id}'`;
    console.log(sql);

    const res = await db.query(sql);
    console.log(res);

    if (res) {
      ctx.body = {
        status: "1",
        message: "更新成功",
      };
    } else {
      ctx.body = {
        status: "0",
        message: "更新失败",
      };
    }
  } catch (error) {
    ctx.body = {
      status: "0",
      message: error.message,
    };
  }
};

// 删除留言
const messageDel = async (ctx, next) => {
  try {
    const { id } = ctx.request.query;
    console.log("id", id);

    const sql = `update message set is_del='1' where id='${id}'`;

    const res = await db.query(sql);

    if (res) {
      ctx.body = {
        status: "1",
        message: "删除成功",
      };
    } else {
      ctx.body = {
        status: "0",
        message: "删除失败",
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
  messageList,
  messageAdd,
  messageDetail,
  messageUpdate,
  messageDel,
};
