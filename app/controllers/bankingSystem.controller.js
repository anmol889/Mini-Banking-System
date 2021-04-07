const db = require("../models");
const User = db.user;
const Transaction = db.transactions;
const Accounts = db.accounts;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var uniqid = require('uniqid');
const { sequelize } = require("../models");


exports.signup = (req, res) => {
  // Validate request
  if (!req.body.email) {
    return res.status(400).send({
      message: "Email can not be empty!"
    });
  }
  else {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(String(req.body.email).toLowerCase()))
  {
    //return (true)
  
    User.findAll({where:{ email: req.body.email }})
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      }
    else{
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      } else {
        const user = {
          email: req.body.email,
          password: hash,
        };
        User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Account."
      });
    });
    Accounts.create({accountNumber:uniqid.process(),balance:0})
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Account."
      });
    });

      }
    });
  }
  });
}
else{
  return res.status(500).json({
    message: "invalid Email"
  });}} 
};






