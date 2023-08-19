const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

// get all db.testimonials array
router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

// get random db.testimonials array element
router.route('/testimonials/random').get((req, res) => {
  const randomIndex = Math.floor(Math.random() * db.testimonials.length);
  const randomTestimonial = db.testimonials[randomIndex];
  res.json(randomTestimonial);
});

// get single db.testimonials array element
router.route('/testimonials/:id').get((req, res) => {
  const id = req.params.id;
  const testimonial = db.testimonials.find((item) => item.id === id);
  if (testimonial) {
    res.json(testimonial);
  } else {
    if (id !== 'random')
      res.status(404).json({ error: 'Testimonial not found' });
  }
});

// post add new element to db.testimonials array
router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;
  if (!author || !text) {
    return res.status(400).json({ error: 'Author and text are required fields' });
  }
  const id = uuidv4();
  const newTestimonial = { id, author, text };
  db.testimonials.push(newTestimonial);
  res.status(201).json({ message: 'OK' });
});
// put modify db.testimonials array element
router.route('/testimonials/:id').put((req, res) => {
  const { id } = req.params;
  const { author, text } = req.body;
  if (!author || !text) {
    return res.status(400).json({ error: 'Author and text are required fields' });
  }
  const testimonial = db.testimonials.find((item) => item.id === id);
  if (!testimonial) {
    return res.status(404).json({ message: 'Testimonial not found' });
  }
  testimonial.author = author;
  testimonial.text = text;
  res.json({ message: 'OK' });
});
// delete element from db.testimonials array
router.route('/testimonials/:id').delete((req, res) => {
  const testimonialId = req.params.id;
  const testimonialIndex = db.testimonials.findIndex((testimonial) => testimonial.id === testimonialId);
  if (testimonialIndex !== -1) {
    db.testimonials.splice(testimonialIndex, 1);
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Testimonial not found' });
  }
});
module.exports = router;