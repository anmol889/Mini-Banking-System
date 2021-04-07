module.exports = app => {
  const signup = require("../controllers/signup.controller.js");
  const statement = require("../controllers/statement.controller.js");
  const login = require("../controllers/login.controller.js");
  const addMoney = require("../controllers/addMoney.controller.js");
  const transaction = require("../controllers/transaction.controller.js");
  var router = require("express").Router();
  const checkAuth = require('../middleware/checkAuth');


  router.post("/signup", signup.accountCreation);
  router.post("/login", login.accountLogin);
  router.post("/transaction",checkAuth, transaction.processTransaction);
  router.post("/statement", checkAuth, statement.transactionStatement);
  router.post("/addMoney", checkAuth, addMoney.addMoneyToAccount);
  app.use("/api", router);
};
