const jwt = require("jsonwebtoken");
const db = require("../db/index");
const dayjs = require("dayjs");

// 根据token获取当前登录的用户名
function getCurrentUser(auth) {
  auth = auth.replace("Bearer ", "");
  return jwt.verify(auth, "blog-token");
}

// 获取首页详情
const homeDetail = async (ctx, next) => {
  try {
    const sql = `select * from home`;

    const res = await db.query(sql);

    console.log(res);

    if (res) {
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

// 更新首页
const homeUpdate = async (ctx, next) => {
  try {
    const { id, image, text } = ctx.request.body;

    const r = await db.query(`select * from home`);
    if (r.length) {
      const sql = `update home set image='${image}',text='${text}' where id='${id}'`;
      const res = await db.query(sql);
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
    } else {
      const sql = `insert into home (image, text) values ('${image}','${text}')`;
      const res = await db.query(sql);
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
    }
  } catch (error) {
    ctx.body = {
      status: "0",
      message: error.message,
    };
  }
};

module.exports = {
  homeDetail,
  homeUpdate,
};
