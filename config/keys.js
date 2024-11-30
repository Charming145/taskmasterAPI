module.exports = {
  // mongooseURI: process.env.DATABASE,
  mongooseURI:
    process.env.DB_HOST +
    "://" +
    process.env.DB_USER +
    ":" +
    process.env.DB_PASS +
    "@stardell.bexed.mongodb.net/" +
    process.env.DB_NAME,
};
