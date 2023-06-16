const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    required: true,
    type: String,
  },
  director: {
    required: true,
    type: String,
  },
  duration: {
    required: true,
    type: Number,
  },
  year: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Введите URL',
    },
  },
  trailerLink: {
    required: true,
    type: String,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Введите URL',
    },
  },
  thumbnail: {
    required: true,
    type: String,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Введите URL',
    },
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  movieId: {
    required: true,
    type: Number,
  },
  nameRU: {
    required: true,
    type: String,
  },
  nameEN: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('movie', movieSchema);
