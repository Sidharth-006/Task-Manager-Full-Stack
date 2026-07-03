const { Sequelize } = require("sequelize");
const env = require("./env");

const sequelizeOptions = {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

const sequelize = env.DATABASE_URL
  ? new Sequelize(env.DATABASE_URL, sequelizeOptions)
  : new Sequelize(
      env.DB_NAME,
      env.DB_USER,
      env.DB_PASSWORD,
      {
        host: env.DB_HOST,
        port: env.DB_PORT || 5432,
        ...sequelizeOptions,
      }
    );

module.exports = sequelize;