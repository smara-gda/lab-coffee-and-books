const express = require('express');

const router = new express.Router();

const Place = require('./../models/place');

// get handler for creating new place

router.get('/create-place', (req, res, next) => {
  res.render('places/create');
});

// handling post request for creating new place

module.exports = router;
