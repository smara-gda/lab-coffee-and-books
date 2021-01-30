const express = require('express');
const router = new express.Router();
const Place = require('./../models/place');

// get handler for creating new place

router.get('/create-place', (req, res, next) => {
  res.render('places/create');
});

// handling post request for creating new place
router.post('/create-place', (req, res, next) => {
  const data = req.body;

  Place.create({
    name: data.name,
    type: data.type
  })
    .then((place) => {
      res.redirect(`/place/${place._id}`);
    })
    .catch((error) => {
      next(error);
    });
});

// handling get request for viewing single place
router.get('place/:id', (req, res, next) => {
  const id = req.params.id;
  Place.findById(id)
    .then((place) => {
      res.render('places/details', { place });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
