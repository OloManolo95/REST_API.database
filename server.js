const express = require('express');
const cors = require('cors');
const db = require('./db');
const path = require('path');
const socket = require('socket.io');

const app = express();

// import routes
const testimonialRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};


app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

// Add access to io in req.io
app.use((req, res, next) => {
  req.io = io;
  next();
});



// Serve static files from the React app
app.use('/api', testimonialRoutes); // add testimonial routes to server
app.use('/api', concertsRoutes); // add concerts routes to server
app.use('/api', seatsRoutes); // add seats routes to server

app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});




io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
});

// catching bad links
app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});
