const Router = require("nextjs-dynamic-routes");

const router = new Router();

router.add({
  name: "index",
  pattern: "/",
});

router.add({
  name: "admin",
  pattern: "/admin",
});

router.add({
  name: "lessons",
  pattern: "/lessons",
});

router.add({
  name: "logout",
  pattern: "/logout",
});

router.add({
  name: "videos",
  page: "/videos",
  pattern: "/videos/:id",
});

module.exports = router;
