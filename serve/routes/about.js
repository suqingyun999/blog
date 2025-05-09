const router = require("koa-router")();
const { aboutDetail, aboutUpdate } = require("../controller/about");

router.prefix("/about");

router.get("/detail", aboutDetail);
router.post("/update", aboutUpdate);

module.exports = router;
