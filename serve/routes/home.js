const router = require("koa-router")();
const {
  homeDetail,
  homeUpdate,
} = require("../controller/home");

router.prefix("/home");

router.get("/detail", homeDetail);
router.post("/update", homeUpdate);

module.exports = router;
