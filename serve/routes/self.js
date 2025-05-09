const router = require("koa-router")();
const {
  getSelfData,
  selfAdd,
  selfDel,
  commentadd,
  commentDel,
  getCommentById
} = require("../controller/self");

router.prefix("/self");

router.post("/selfData", getSelfData);
router.post("/selfAdd", selfAdd);
router.get("/selfDel", selfDel);
router.post("/commentadd", commentadd);
router.get("/commentDel", commentDel);
router.get("/getCommentById", getCommentById);

module.exports = router;
