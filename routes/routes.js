module.exports = function(app) {
  app.get("/test", function(req, res) {
    return res.json({test: "success"});
  });
};
