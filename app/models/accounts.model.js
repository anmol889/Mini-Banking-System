module.exports = (sequelize, Sequelize) => {
    const Accounts = sequelize.define("accounts", {
      accountNumber: {
        type: Sequelize.STRING,
      },
      balance: {
        type: Sequelize.DOUBLE,
      }
    });
  
    return Accounts;
  };