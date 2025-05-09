const router = require("koa-router")();
const {
  pageHomeDetail,
  pageContentList,
  pageContentDetail,
  pageMessageList,
  pageAboutDetail,
  pageMessageAdd
} = require("../controller/page");

router.prefix("/page");

router.get("/homeDetail", pageHomeDetail);
router.post("/contentList", pageContentList);
router.get("/contentDetail", pageContentDetail);
router.get("/aboutDetail", pageAboutDetail);
router.post("/messageList", pageMessageList);
router.post("/messageAdd", pageMessageAdd);

module.exports = router;
