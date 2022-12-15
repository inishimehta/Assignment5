const Sequelize = require("sequelize");

//setup db connection
var sequelize = new Sequelize(
  "sftsgxgn",
  "sftsgxgn",
  "wxhrCdzRP-HC0rCWp4QusGzy0MMCz6ki",
  {
    host: "mouse.db.elephantsql.com",
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
