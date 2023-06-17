const express = require('express');
const mongoose = require('mongoose');
const { MONGO_URL } = require('./src/utils/config');
const router = require('./src/routes/index');

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());
app.use(router);

async function start() {
  try {
    await mongoose.connect(MONGO_URL);
    await app.listen(PORT);
    await console.log(`App listening on port ${PORT}`);
  } catch (err) {
    console.log(err);
  }
}

start();
