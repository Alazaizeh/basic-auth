"use strict";

// const POSTGRES_URI = process.env.POSTGRES_URI || 'postgres://localhost/postgres';
const POSTGRES_URI =
  process.env.POSTGRES_URI ||
  "postgres://pfwvsseb:nsW3ouLEURu7OyQ_rDA7sJ8s13aeOTt7@tai.db.elephantsql.com/pfwvsseb";
// "postgresql://postgres:0000@localhost:5432/class04";
const { Sequelize, DataTypes } = require("sequelize");
const users = require("./users");

// const Collection = require("./collection-class");

var sequelize = new Sequelize(POSTGRES_URI, {});

const usersModel = users(sequelize, DataTypes);

// const usersCollection = new Collection(usersModel);

module.exports = {
  db: sequelize,
  Users: usersModel,
};
