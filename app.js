const { errors } = require('celebrate');
const express = require('express');
const mongoose = require('mongoose');
const { requestLogger, errorLogger } = require('./src/middlewares/logger');
const limiter = require('./src/middlewares/rateLimiter');
const { MONGO_URL } = require('./src/utils/config');
const router = require('./src/routes/index');

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());
app.use(requestLogger);
app.use(limiter);
app.use(router);
app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const {
    status = 500,
    message,
  } = err;
  res.status(status)
    .send({
      message: status === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

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
