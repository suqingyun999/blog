const jwt = require("jsonwebtoken");
const db = require("../db/index");
const dayjs = require("dayjs");

// 根据token获取当前登录的用户名
function getCurrentUser(auth) {
  auth = auth.replace("Bearer ", "");
  return jwt.verify(auth, "blog-token");
}

// 获取文章列表
const contentList = async (ctx, next) => {
  const {
    page,
    // data: { title, time, status },
  } = ctx.request.body;

  try {
    const res = await db.query(
      `select count(*) as total from content where is_del=0`
    );
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

// 新增文章
const contentAdd = async (ctx, next) => {
  try {
    const { title, datetime, subtitle, image, article } = ctx.request.body;

    // const author_name = getCurrentUser(ctx.header.authorization).nickname;
    // const author = getCurrentUser(ctx.header.authorization).id;

    const sql = `insert into content (title, datetime, subtitle, image, article) values ('${title}','${datetime}','${subtitle}','${image}','${article}')`;
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

// 获取文章详情
const contentDetail = async (ctx, next) => {
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

// 更新文章
const contentUpdate = async (ctx, next) => {
  try {
    const { id, title, datetime, subtitle, image, article } = ctx.request.body;

    const sql = `update content set title='${title}',subtitle='${subtitle}',image='${image}',datetime='${datetime}',article='${article}' where id='${id}'`;
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

// 删除文章
const contentDel = async (ctx, next) => {
  try {
    const { id } = ctx.request.query;
    console.log("id", id);

    const sql = `update content set is_del='1' where id='${id}'`;

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
  contentList,
  contentAdd,
  contentDetail,
  contentUpdate,
  contentDel,
};
