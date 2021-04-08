const db = require("../models");
const Accounts = db.accounts;
const User = db.user;
const jwt = require('jsonwebtoken');
const Transaction = db.transactions;
var uniqid = require('uniqid');


exports.addMoneyToAccount =  async (req, res) => {
    var depositor;
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, "secret");
    var userEmail = decoded.email;
    User.findAll({where:{ email: userEmail }})
    .then(data=>{
      depositor=data[0].accountNumber;
    Accounts.findAll({where:{ accountNumber: depositor}})
    .then(data=>{
        Accounts.update({balance:data[0].balance+req.body.amount},
            {where:{ accountNumber: depositor}})
        Transaction.create({
            from: depositor,
            to:depositor,
            amount:req.body.amount,
            to_balance:data[0].balance+req.body.amount,
            from_balance:data[0].balance+req.body.amount,
            status:"success",
            transactionType:"addMoney",
            transactionId:uniqid.process()})
            res.status(200).json({accountNumber:depositor, currentBalance: data[0].balance+req.body.amount, amountAdded:req.body.amount});

    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while adding money to the Account."
        });
      });
    });
  };