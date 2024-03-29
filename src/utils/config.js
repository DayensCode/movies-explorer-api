require('dotenv').config();

const {
  MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  JWT_SECRET = 'dev',
  NODE_ENV,
} = process.env;

module.exports = {
  MONGO_URL,
  JWT_SECRET,
  NODE_ENV,
};
