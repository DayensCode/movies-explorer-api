const cors = require('cors');
const { errors } = require('celebrate');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./src/middlewares/logger');
const limiter = require('./src/middlewares/rateLimiter');
const { MONGO_URL } = require('./src/utils/config');
const router = require('./src/routes/index');

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use(router);
app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  if (err.code === 11000) {
    return res.status(409).send({ message: 'Пользователь с таким email уже существует' });
  }

  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  return next();
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
