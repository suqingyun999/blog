const jwt = require("jsonwebtoken");
const db = require("../db/index");
const dayjs = require("dayjs");
const { log } = require("debug/src/browser");
// 根据token获取当前登录的用户名
function getCurrentUser(auth) {
  auth = auth.replace("Bearer ", "");
  return jwt.verify(auth, "blog-token");
}

// 获取朋友圈
const getSelfData = async (ctx, next) => {
  const { page } = ctx.request.body;
  try {
    const res = await db.query(
      `select count(*) as total from self where is_del=0`
    );
    const total = res[0].total; // 总数
    const pageSize = page.pageSize; // 每页条数
    const current = page.current; //当前页数
    const pages = Math.ceil(total / pageSize); // 总页数

    const sql1 = `select id,type,text,content,datetime from self where is_del=0 order by datetime desc limit ${
      (current - 1) * pageSize
    },${pageSize}`;
    const res1 = await db.query(sql1);

    console.log("res1", res1);

    const sql2 = `select a.id,b.id as comment_id,b.name,b.comment_data from (select id,type,text,content,datetime from self where is_del=0 order by datetime desc limit ${
      (current - 1) * pageSize
    },${pageSize}) a inner join comment b on a.id=b.self_id and b.is_del=0`;
    const res2 = await db.query(sql2);

    console.log("res2", res2);

    const selfMap = res1.map((item) => {
      return {
        ...item,
        datetime: dayjs(item.datetime).format("YYYY-MM-DD HH:mm:ss"),
        allComments: [],
      };
    });
    // 数据清洗 同一朋友圈评论合并
    res2.forEach((item) => {
      const data = selfMap.find((data) => data?.id == item.id);
      if (data) {
        data.allComments.push({
          id: item.comment_id,
          name: item.name,
          comment: item.comment_data,
        });
      }
    });
    if (res1) {
      ctx.body = {
        status: "1",
        message: "查询成功",
        data: {
          page: {
            current,
            pageSize,
            pages,
            total,
          },
          data: selfMap,
        },
      };
    } else {
      ctx.body = {
        status: "0",
        message: "查询失败",
      };
    }
  } catch (error) {
    ctx.body = {
      status: "0",
      message: error.message,
    };
  }
};

// 获取指定朋友圈评论
const getCommentById = async (ctx, next) => {
  const { id } = ctx.request.query;
  try {
    const sql = `select * from comment where self_id=${id} and is_del=0 order by datetime asc`;
    const res = await db.query(sql);
    const allComments = res.map((item) => {
      return {
        id: item.id,
        name: item.name,
        comment: item.comment_data,
      };
    });

    console.log("res", res);

    if (res.length) {
      ctx.body = {
        status: "1",
        message: "查询成功",
        data: {
          id: res[0].self_id,
          allComments,
        },
      };
    } else {
      ctx.body = {
        status: "0",
        message: "查询失败",
      };
    }
  } catch (error) {
    ctx.body = {
      status: "0",
      message: error.message,
    };
  }
};

// 新增朋友圈
const selfAdd = async (ctx, next) => {
  try {
    const { type, text, content } = ctx.request.body;
    const sql = `insert into self (type, text, content) values ('${type}','${text}','${content}')`;
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

// 删除朋友圈
const selfDel = async (ctx, next) => {
  try {
    const { id } = ctx.request.query;
    const sql1 = `update self set is_del='1' where id='${id}'`;
    const sql2 = `update comment set is_del='1' where self_id='${id}'`;
    const res1 = await db.query(sql1);
    const res2 = await db.query(sql2);
    if (res1) {
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

// 新增评论
const commentadd = async (ctx, next) => {
  try {
    const { name, comment_data, self_id } = ctx.request.body;
    const sql = `insert into comment (name, comment_data, self_id) values ('${name}','${comment_data}','${self_id}')`;
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

// 删除评论
const commentDel = async (ctx, next) => {
  try {
    const { id } = ctx.request.query;
    const sql = `update comment set is_del='1' where id='${id}'`;
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
  getSelfData,
  selfAdd,
  selfDel,
  commentadd,
  commentDel,
  getCommentById,
};
