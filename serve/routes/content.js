const router = require("koa-router")();
const {
  contentList,
  contentAdd,
  contentDetail,
  contentUpdate,
  contentDel,
} = require("../controller/content");

router.prefix("/content");

router.post("/list", contentList);
router.post("/add", contentAdd);
router.get("/detail", contentDetail);
router.post("/update", contentUpdate);
router.get("/delete", contentDel);

module.exports = router;
