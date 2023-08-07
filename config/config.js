require('dotenv').config();
const CONFIG = {}; // Make this global to use all over the application

CONFIG.app = process.env.APP_ENV;   //production or development
CONFIG.port = process.env.APP_PORT;

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": process.env.DB_CONNECTION,
    "pool": {
      "handleDisconnects": true,
      "max": 13,
      "min": 1,
      "idle": 10000,
      "acquire": 20000
    }
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": process.env.DB_CONNECTION,
    "pool": {
      "handleDisconnects": true,
      "max": 13,
      "min": 1,
      "idle": 10000,
      "acquire": 20000
    }
  },
  CONFIG
};


