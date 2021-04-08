module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    mobileNumber: {
      type: Sequelize.STRING,
    },
    accountNumber: {
      type: Sequelize.STRING,
    }
  });
  return User;
};
