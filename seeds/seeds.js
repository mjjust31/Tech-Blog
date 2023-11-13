const sequelize = require("../config/connection");
const User = require("../models/user");

// const storyData = require("./story");
// const imageData = require("./image");
const userData = require("./userData");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // const image = await Image.bulkCreate(imageData);
  // const story = await Story.bulkCreate(storyData);
  const user = await User.bulkCreate(userData);
  console.log("Database seeded!");
  process.exit(0);
};
seedDatabase();
