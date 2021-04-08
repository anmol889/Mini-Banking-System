module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transaction", {
      from: {
        type: Sequelize.STRING,
      },
      transactionId: {
        type: Sequelize.STRING,
      },
      to: {
        type: Sequelize.STRING,
      },
      amount: {
        type: Sequelize.DOUBLE,
      },
      to_balance: {
        type: Sequelize.DOUBLE,
      },
      from_balance: {
        type: Sequelize.DOUBLE,
      },
      status: {
        type: Sequelize.STRING,
      },
      transactionType: {
        type: Sequelize.STRING,
      }
    });
  
    return Transaction;
  };
  