const db = require("../models");
const User = db.user;
const Accounts = db.accounts;
const bcrypt = require("bcrypt");
var uniqid = require('uniqid');


exports.accountCreation = (req, res) => {
  // Validate request
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({
      message: "Email and password can not be empty!"
    });
  }
  else {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(String(req.body.email).toLowerCase()))
  {
    if(req.body.mobileNumber.length<=10){

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
        var accountNo= Date.now();
        const user = {
          email: req.body.email,
          password: hash,
          name:req.body.name,
          address:req.body.address,
          mobileNumber:req.body.mobileNumber,
          accountNumber:accountNo
        };
        
        User.create(user)
    .then(data => {
      res.status(200).json({accountNumber:accountNo,messsage:"account created successfully",nextStep:"add money to your account to enjoy services"});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Account."
      });
    });
    Accounts.create({accountNumber:accountNo,balance:0})
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
        message: "invalid MobileNumber"
      });

    }
    
}
else{
  return res.status(500).json({
    message: "invalid Email"
  });
}} 
};






