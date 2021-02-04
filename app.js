'use strict';

const { join } = require('path');
const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const serveFavicon = require('serve-favicon');
const indexRouter = require('./routes/index');
const placesRouter = require('./routes/places');

const app = express();

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(serveFavicon(join(__dirname, 'public/images', 'favicon.ico')));
app.use(
  sassMiddleware({
    src: join(__dirname, 'public'),
    dest: join(__dirname, 'public'),
    outputStyle:
      process.env.NODE_ENV === 'development' ? 'nested' : 'compressed',
    force: process.env.NODE_ENV === 'development',
    sourceMap: true
  })
);
app.use(express.static(join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/', placesRouter);

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

const hbs = require('hbs');

//register hbs helper
// coffee_shop
// bookstore
hbs.registerHelper('split', (aString) => {
  let book = aString.substring(0, aString.length - 5);
  const upperCaseBook = book.charAt(0).toUpperCase() + book.slice(1);
  const store = aString.substring(aString.length - 5, aString.length);
  return upperCaseBook + ' ' + store;
});

// Catch all error handler
app.use((error, req, res, next) => {
  // Set error information, with stack only available in development
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};
  res.status(error.status || 500);
  res.render('error');
  console.log(error);
});

module.exports = app;
