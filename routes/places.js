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
router.get('/place/:id', (req, res, next) => {
  const id = req.params.id;
  Place.findById(id)
    .then((place) => {
      res.render('places/details', { place });
    })
    .catch((error) => {
      next(error);
    });
});

// handling update  place get request
router.get('/place/:id/update-place', (req, res, next) => {
  const id = req.params.id;
  Place.findById(id)
    .then((place) => {
      res.render('places/update', { place });
    })
    .catch((error) => {
      next(error);
    });
});

// add a post handler for updating place
router.post('/place/:id/update-place', (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  Place.findByIdAndUpdate(id, {
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

module.exports = router;
