const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

// get all db.concerts array
router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

// get random db.concerts array element
router.route('/concerts/random').get((req, res) => {
  const randomIndex = Math.floor(Math.random() * db.concerts.length);
  const randomConcert = db.concerts[randomIndex];
  res.json(randomConcert);
});

// get single db.concerts array element
router.route('/concerts/:id').get((req, res) => {
  const id = req.params.id;
  const concert = db.concerts.find((item) => item.id === id);
  if (concert) {
    res.json(concert);
  } else {
    if (id !== 'random')
      res.status(404).json({ error: 'Concert not found' });
  }
});

// post add new element to db.concerts array
router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;

  if (!performer || !genre || !price || !day || !image) {
    return res.status(400).json({ error: 'One or more mandatory fields omitted.' });
  }

  const id = uuidv4();
  const newConcert = { id, performer, genre, price, day, image };
  db.concerts.push(newConcert);
  res.status(201).json({ message: 'OK' });
});

// put modify db.concerts array element
router.route('/concerts/:id').put((req, res) => {
  const { id } = req.params;
  const { performer, genre, price, day, image } = req.body;

  if (!performer || !genre || !price || !day || !image) {
    return res.status(400).json({ error: 'One or more mandatory fields omitted.' });
  }

  const concert = db.concerts.find((item) => item.id === id);

  if (!concert) {
    return res.status(404).json({ message: 'Concert not found' });
  }

  concert.performer = performer;
  concert.genre = genre;
  concert.price = price;
  concert.day = day;
  concert.image = image;

  res.json({ message: 'OK' });
});

module.exports = router;