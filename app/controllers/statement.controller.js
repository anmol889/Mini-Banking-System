const db = require("../models");
const Transaction = db.transactions;

exports.statement =   async (req, res) => {

    var list = [];
    Transaction.findAll({where:{ to: req.body.accountNumber}})
    .then(data=>{
     
        for(var i=0;i<data.length;i++)
      {
        if(data[0].status==="success"){
            list.push({transactionId:data[i].transactionId,credit:data[i].amount,debit:0,createdAt:data[i].createdAt,current_balance:data[i].to_balance,transaction_amount:data[i].amount,transaction_status:data[0].status})
          }
          else{
            list.push({transactionId:data[i].transactionId,credit:0,debit:0,createdAt:data[i].createdAt,current_balance:data[i].to_balance,transaction_amount:data[i].amount,transaction_status:data[0].status})
          }  
       
      }
      //console.log(list);
      })
      Transaction.findAll({where:{ from: req.body.accountNumber}})
    .then(data=>{
     
        for(var i=0;i<data.length;i++)
      {
        if(data[0].status==="success"){
            list.push({transactionId:data[i].transactionId,credit:0,debit:data[i].amount,createdAt:data[i].createdAt,current_balance:data[i].to_balance,transaction_amount:data[i].amount,transaction_status:data[0].status})
          }
          else{
            list.push({transactionId:data[i].transactionId,credit:0,debit:0,createdAt:data[i].createdAt,current_balance:data[i].to_balance,transaction_amount:data[i].amount,transaction_status:data[0].status})
          }  
      }
      console.log(list);
      list.sort((a, b) => (a.updatedAt > b.updatedAt) ? -1 : 1)
      res.send(list);
      })
      
    
  
  };
  
  