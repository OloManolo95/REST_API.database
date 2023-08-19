const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');

const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// get all db.testimonials array
app.get('/testimonials', (req, res) => {
    res.json(db.testimonials);
  });

// get random db.testimonials array element
app.get('/testimonials/random', (req, res) => {
    const randomIndex = Math.floor(Math.random() * db.testimonials.length);
    const randomTestimonial = db.testimonials[randomIndex];
    res.json(randomTestimonial);
});

// get single db.testimonials array element
app.get('/testimonials/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const testimonial = db.testimonials.find((item) => item.id === id);
    if (testimonial) {
        res.json(testimonial);
    } else {
        res.status(404).json({ error: 'Testimonial not found' });
    }
});


// add new element to an array, Id must be random
app.post('/testimonials/:id', (req, res) => {

    const { author, text } = req.body;

    if (!author || !text) {
        return res.status(400).json({ error: 'Author and text are required fields' });
      }

    const id = uuidv4();
    const newTestimonial = { id, author, text };

    db.testimonials.push(newTestimonial);

});

// modify atributes in array element with matching Id
app.put('/testimonials/:id', (req, res) => {
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
app.delete('/testimonials/:id', (req, res) => {
    const testimonialId = req.params.id;

    const testimonialIndex = db.testimonials.findIndex((testimonial) => testimonial.id === testimonialId);

    if (testimonialIndex !== -1) {
      db.testimonials.splice(testimonialIndex, 1);
      res.json({ message: 'OK' });
    } else {
      res.status(404).json({ message: 'Testimonial not found' });
    }
  });


app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});