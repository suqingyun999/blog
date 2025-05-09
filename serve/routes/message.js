const router = require("koa-router")();
const {
  messageList,
  messageAdd,
  messageDetail,
  messageUpdate,
  messageDel,
} = require("../controller/message");

router.prefix("/message");

router.post("/list", messageList);
router.post("/add", messageAdd);
router.get("/detail", messageDetail);
router.post("/update", messageUpdate);
router.get("/delete", messageDel);

module.exports = router;
