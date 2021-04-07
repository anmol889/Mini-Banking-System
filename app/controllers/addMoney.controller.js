const db = require("../models");
const Accounts = db.accounts;


exports.addMoney =  async (req, res) => {

    Accounts.findAll({where:{ accountNumber: req.body.accountNumber}})
    .then(data=>{
        Accounts.update({balance:data[0].balance+req.body.amount},
            {where:{ accountNumber: req.body.accountNumber}})
        res.status(200).json({accountNumber:req.body.accountNumber, balance: data[0].balance+req.body.amount});
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while adding money to the Account."
        });
      });
    
  };