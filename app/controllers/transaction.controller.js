const db = require("../models");
const Transaction = db.transactions;
const Accounts = db.accounts;
var uniqid = require('uniqid');
const { sequelize } = require("../models");


exports.transaction =  async (req, res) => {
    var flag = 0;
    var flag1 = 0;
    var balanceAfterDebit=0,balanceAfterCredit=0;
    const t = await sequelize.transaction();
    try{
  
      Accounts.findAll({where:{ accountNumber: req.body.from }},{transaction:t})
      .then(data3=>{
        if(req.body.amount>data3[0].balance){
           flag1=1;  
        }
      });
  
      await Accounts.findAll({where:{ accountNumber: req.body.to }},{transaction:t})
        .then(data1 =>{
        if(data1.length<1){
          flag=1;
          res.status(404).json({message:"transaction Unsuccessfull, account does not exist "});
        }
        else{
          if(flag1!=1){
            balanceAfterCredit=data1[0].balance+req.body.amount;
        Accounts.update({balance:data1[0].balance+req.body.amount},
        {where:{ accountNumber: req.body.to }},{transaction:t})
          }
          else{
            balanceAfterCredit=data1[0].balance;
          }
          }});
    
        await Accounts.findAll({where:{ accountNumber: req.body.from }},{transaction:t})
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
        {where:{ accountNumber: req.body.from }},{transaction:t})
  
          }
          }
        else{
            balanceAfterDebit=data2[0].balance;
        }});
        
        await Transaction.create({from: req.body.from,
          to: req.body.to,
          amount:req.body.amount,
          to_balance:balanceAfterCredit,
          from_balance:balanceAfterDebit,
          status: (flag==1 || flag1==1)?"failed":"success",
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