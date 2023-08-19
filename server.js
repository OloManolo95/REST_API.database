const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');

const app = express();

// import routes
const testimonialRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', testimonialRoutes); // add testimonial routes to server
app.use('/api', concertsRoutes); // add concerts routes to server
app.use('/api', seatsRoutes); // add seats routes to server

// catching bad links
app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});
app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});