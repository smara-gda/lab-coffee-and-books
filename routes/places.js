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
  // if the user does not provide a new value, we should keep the old one.
  //Right now this code will update the value to null.
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

//add handlers to delete places

router.post('/place/:id/delete', (req, res, next) => {
  const id = req.params.id;
  Place.findByIdAndDelete(id)
    .then(() => {
      res.render('index', { message: 'The place was deleted' });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/places', (req, res, next) => {
  Place.find()
    .then((places) => {
      res.render('places/all-places', { places });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
