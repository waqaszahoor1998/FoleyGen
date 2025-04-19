const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    next();
  });
  //this port should be for backend
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:3000",
      changeOrigin: true,
    })
  );
};
