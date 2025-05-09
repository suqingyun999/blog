const router = require("koa-router")();
const {
  homeList,
  homeAdd,
  homeDetail,
  homeUpdate,
  homeDel,
  homeChangeStatus,
} = require("../controller/home");

router.prefix("/home");

router.get("/detail", homeDetail);
router.post("/update", homeUpdate);

module.exports = router;
