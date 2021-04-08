const db = require("../models");
const User = db.user;
const Transaction = db.transactions;
const Accounts = db.accounts;
var uniqid = require('uniqid');
const { sequelize } = require("../models");
const jwt = require('jsonwebtoken');

exports.processTransaction =  async (req, res) => {
    var flag = 0;
    var flag1 = 0;
    var balanceAfterDebit=0,balanceAfterCredit=0;
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, "secret");
    var  depositor = decoded.accountNumber;
    
    const t = await sequelize.transaction();
    try{
      await Accounts.findAll({where:{ accountNumber: depositor }},{transaction:t})
      .then(data3=>{
        if(req.body.amount>data3[0].balance){
           flag1=1;  
           res.status(500).json({message:"transaction Unsuccessfull, you do not have enough balance to make a transaction"});

        }
      }).catch(err => {
        res.status(500).send({
          message: err.message 
        });
      });
  
      await Accounts.findAll({where:{ accountNumber: req.body.accountNumber }},{transaction:t})
        .then(data1 =>{
        if(data1.length<1){
          flag=1;
          res.status(404).json({message:"transaction Unsuccessfull, account does not exist "});
        }
        else{
          if(flag1!=1){
            balanceAfterCredit=data1[0].balance+req.body.amount;
        Accounts.update({balance:data1[0].balance+req.body.amount},
        {where:{ accountNumber: req.body.accountNumber }},{transaction:t})
          }
          else{
            balanceAfterCredit=data1[0].balance;
          }
          }});
    
        await Accounts.findAll({where:{ accountNumber: depositor }},{transaction:t})
        .then(data2 =>{ 
        if(flag!=1){
          if(req.body.amount>data2[0].balance)
          {
            balanceAfterDebit=data2[0].balance;
            res.status(500).json({message:"transaction Unsuccessfull, you do not have enough balance to make a transaction"});
          }
          else{
            balanceAfterDebit=data2[0].balance-req.body.amount;
        Accounts.update({balance:data2[0].balance-req.body.amount},
        {where:{ accountNumber: depositor }},{transaction:t})
  
          }
          }
        else{
            balanceAfterDebit=data2[0].balance;
        }});
        
        await Transaction.create({
          from: depositor,
          to: req.body.accountNumber,
          amount:req.body.amount,
          to_balance:balanceAfterCredit,
          from_balance:balanceAfterDebit,
          status: (flag==1 || flag1==1)?"failed":"success",
          transactionType:"normal",
          transactionId:uniqid.process()},{transaction:t})
    
  
        t.commit();
        return res.send({transactionId:uniqid.process(),message:"transaction successfull"});
        
    }
    catch(e)
    {
      t.rollback();
      res.status(500).send({
        message:
          err.message || "Some error occurred while transaction."
      }); 
  
    }
  };