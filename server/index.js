const express = require("express");
const next = require("next");
const compression = require("compression");
const Router = require("./routes");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = Router.getRequestHandler(app);

const sslRedirect = (environments, status) => {
  environments = environments || ["production"];
  status = status || 301;
  return function(req, res, next) {
    if (environments.indexOf(process.env.NODE_ENV) >= 0) {
      if (req.headers["x-forwarded-proto"] != "https") {
        res.redirect(status, "https://" + req.hostname + req.originalUrl);
      } else {
        next();
      }
    } else {
      next();
    }
  };
};

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(compression());
    server.use(sslRedirect());

    server.get("/favicon.ico", (req, res) => res.status(200).sendFile("favicon.ico", { root: __dirname }));

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
