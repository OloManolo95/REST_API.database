const Testimonial = require('../models/testimonials.model');

/* get all db.testimonials array
router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});*/

exports.getAll = async (req, res) => {
    try {
      res.json(await Testimonial.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

/* get random db.testimonials array element
router.route('/testimonials/random').get((req, res) => {
  const randomIndex = Math.floor(Math.random() * db.testimonials.length);
  const randomTestimonial = db.testimonials[randomIndex];
  res.json(randomTestimonial);
});*/

exports.getRandom = async (req, res) => {
    try {
      const count = await Testimonial.countDocuments();
      const randomIndex = Math.floor(Math.random() * count);
      const randomTestimonial = await Testimonial.findOne().skip(rand);
      if(!randomTestimonial) res.status(404).json({ message: 'Not found' });
      else res.json(randomTestimonial);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };


/* get single db.testimonials array element
router.route('/testimonials/:id').get((req, res) => {
  const id = req.params.id;
  const testimonial = db.testimonials.find((item) => item.id === id);
  if (testimonial) {
    res.json(testimonial);
  } else {
    if (id !== 'random')
      res.status(404).json({ error: 'Testimonial not found' });
  }
});*/

exports.getById = async (req, res) => {
    try {
      const testimonial = await Testimonial.findById(req.params.id);
      if(!testimonial) res.status(404).json({ message: 'Not found' });
      else res.json(testimonial);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

/* post add new element to db.testimonials array
router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;
  if (!author || !text) {
    return res.status(400).json({ error: 'Author and text are required fields' });
  }
  const id = uuidv4();
  const newTestimonial = { id, author, text };
  db.testimonials.push(newTestimonial);
  res.status(201).json({ message: 'OK' });
});*/

exports.addNew = async (req, res) => {
    try {
      const { author, text } = req.body;
      const newTestimonial = new Testimonial({ author: author, text: text });
      await newTestimonial.save();
      res.json({ message: 'OK' });
    } catch(err) {
      res.status(500).json({ message: err });
    }
  };


/* put modify db.testimonials array element
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
});*/

exports.modifyById = async (req, res) => {
    const { author, text } = req.body;
    try {
      const testimonial = await Testimonial.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { author: author, text: text } },
        { new: true } // This option returns the updated document
      );

      if (!testimonial) {
        return res.status(404).json({ message: 'Not found...' });
      }

      res.json(testimonial);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };

/* delete element from db.testimonials array
router.route('/testimonials/:id').delete((req, res) => {
  const testimonialId = req.params.id;
  const testimonialIndex = db.testimonials.findIndex((testimonial) => testimonial.id === testimonialId);
  if (testimonialIndex !== -1) {
    db.testimonials.splice(testimonialIndex, 1);
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Testimonial not found' });
  }
});*/

exports.removeById = async (req, res) => {
    try {
      const testimonial = await Testimonial.findById(req.params.id);

      if (!testimonial) {
        return res.status(404).json({ message: 'Not found...' });
      }

      const deletedTestimonial = await Testimonial.findOneAndDelete({ _id: req.params.id });

      res.json(deletedTestimonial);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };

module.exports = router;