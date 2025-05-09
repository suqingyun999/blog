const router = require("koa-router")();
const {
  userLogin,
  getUserInfo,
  updateUserInfo,
} = require("../controller/users");

router.prefix("/users");

router.post("/login", userLogin);
router.get("/userInfo", getUserInfo);
router.post("/updateUserInfo", updateUserInfo);

module.exports = router;
