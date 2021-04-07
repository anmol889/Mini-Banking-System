const db = require("../models");
const Transaction = db.transactions;

exports.statement =   async (req, res) => {

    var list = [];
    Transaction.findAll({where:{ to: req.body.accountNumber}})
    .then(data=>{
     
        for(var i=0;i<data.length;i++)
      {
        list.push({transactionId:data[i].transactionId,credit:data[i].amount,debit:0,updatedAt:data[i].updatedAt,balance:data[i].to_balance})
       
      }
      //console.log(list);
      })
      Transaction.findAll({where:{ from: req.body.accountNumber}})
    .then(data=>{
     
        for(var i=0;i<data.length;i++)
      {
        list.push({transactionId:data[i].transactionId,credit:0,debit:data[i].amount,updatedAt:data[i].updatedAt,balance:data[i].from_balance})
  
      }
      console.log(list);
      list.sort((a, b) => (a.updatedAt > b.updatedAt) ? -1 : 1)
      res.send(list);
      })
      
    
  
  };
  
  