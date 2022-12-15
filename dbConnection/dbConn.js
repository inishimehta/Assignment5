const Sequelize = require("sequelize");

//setup db connection
var sequelize = new Sequelize(
  process.env.database,
  process.env.user,
  process.env.password,
  {
    host: process.env.host,
    dialect: "postgres",
    port: 5432,
    dialectOptions: {
      ssl: { rejectUnauthorized: false },
    },
    query: { raw: true },
    logging: false,
  }
);

//authenticate connection
sequelize
  .authenticate()
  .then(() => console.log("Connection success."))
  .catch((err) => console.log("Unable to connect to DB.", err));

module.exports = { sequelize, Sequelize };
