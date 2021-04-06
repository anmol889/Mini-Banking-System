module.exports = app => {
  const user = require("../controllers/bankingSystem.controller.js");
  var router = require("express").Router();


  router.post("/signup", user.signup);
  app.use("/api", router);
};
