const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/api/rest", { target: "http://localhost:8081/" }));
};
