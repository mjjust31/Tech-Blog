const sequelize = require("../config/connection");
const { User } = require("../models");

const userData = require("./user");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const user = await User.bulkCreate(userData);

  process.exit(0);
};
seedDatabase();
