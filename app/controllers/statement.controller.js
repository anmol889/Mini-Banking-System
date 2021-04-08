const db = require("../models");
const Transaction = db.transactions;
const jwt = require('jsonwebtoken');
const User = db.user;

exports.transactionStatement =   async (req, res) => {

    var list = [];
    var userAccountNumber;
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, "secret");
    var userEmail = decoded.email;
    User.findAll({where:{ email: userEmail }})
    .then(data=>{
      userAccountNumber=data[0].accountNumber;
    Transaction.findAll({where:{ to: userAccountNumber}})
    .then(data=>{
        for(var i=0;i<data.length;i++)
      {
        if(data[i].status==="success"){
            list.push({transactionId:data[i].transactionId,credit:data[i].amount,createdAt:data[i].createdAt,current_balance:data[i].to_balance,transaction_status:data[i].status,senderAccountNumber:data[i].from})
          }
          else{
            list.push({transactionId:data[i].transactionId,createdAt:data[i].createdAt,current_balance:data[i].to_balance,transaction_amount:data[i].amount,transaction_status:data[i].status,senderAccountNumber:data[i].from})
          }  
       
      }
      //console.log(list);
      });
      Transaction.findAll({where:{ from:userAccountNumber}})
    .then(data=>{
        for(var i=0;i<data.length;i++)
      {
        
        if(data[i].status==="success"){
          if(data[i].transactionType==="normal"){
            list.push({transactionId:data[i].transactionId,debit:data[i].amount,createdAt:data[i].createdAt,current_balance:data[i].from_balance,transaction_status:data[i].status,receiverAccountNumber:data[i].to})
          }
          }
          else{
            list.push({transactionId:data[i].transactionId,createdAt:data[i].createdAt,current_balance:data[i].from_balance,transaction_amount:data[i].amount,transaction_status:data[i].status,receiverAccountNumber:data[i].to})
          }  
      }
      
      list.sort((a, b) => (a.createdAt > b.createdAt) ? -1 : 1)
      res.send(list);
      });
      
    });
  
  };
  
  