module.exports = app => {
  const user = require("../controllers/bankingSystem.controller.js");
  const statement1 = require("../controllers/statement.controller.js");
  const login1 = require("../controllers/login.controller.js");
  
  const transaction1 = require("../controllers/transaction.controller.js");
  var router = require("express").Router();
  const checkAuth = require('../middleware/checkAuth');


  router.post("/signup", user.signup);
  router.post("/login", login1.login);
  router.post("/transaction",checkAuth, transaction1.transaction);
  router.post("/statement", checkAuth, statement1.statement);
  app.use("/api", router);
};
