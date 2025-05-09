const db = require("../db/index");

// 获取关于详情
const aboutDetail = async (ctx, next) => {
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

// 更新关于
const aboutUpdate = async (ctx, next) => {
  try {
    const { id, self, game, work, life } = ctx.request.body;
    const r = await db.query(`select * from about`);
    if (r.length) {
      const sql = `update about set self='${self}',game='${game}',work='${work}',life='${life}' where id='${id}'`;
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
      const sql = `insert into about (self, work,life,game) values ('${self}','${work}','${life}','${game}')`;
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
  aboutDetail,
  aboutUpdate,
};
