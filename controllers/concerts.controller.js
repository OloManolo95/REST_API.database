const Concert = require('../models/concerts.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Concert.find());
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Concert.countDocuments();  
    const randomIndex = Math.floor(Math.random() * count);
    const randomConcert = await Concert.findOne().skip(randomIndex)
    if(!randomConcert)
    res.status(404).json({ message: 'Not found' });
    else res.json(randomConcert);
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};    

exports.getById = async (req, res) => {
    try {
      const concert = await Concert.findById(req.params.id);
      if(!concert) res.status(404).json({ message: 'Concert not found' });
      else res.json(concert);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

exports.addNew = async (req, res) => {
    try {
      const { performer, genre, price, day, image } = req.body;
      const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });
      await newConcert.save();
      res.json({ message: 'OK' });
    } catch(err) {
      res.status(500).json({ message: err });
    }
  };

exports.modifyById = async (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    try {
      const concert = await Concert.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { performer: performer, genre: genre, price: price, day: day, image: image } },
        { new: true } // This option returns the updated document
      );

      if (!concert) {
        return res.status(404).json({ message: 'Not found...' });
      }

      res.json(concert);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };

  exports.removeById = async (req, res) => {
    try {
      const concert = await Concert.findById(req.params.id);

      if (!concert) {
        return res.status(404).json({ message: 'Not found...' });
      }

      const deletedConcert = await Concert.findOneAndDelete({ _id: req.params.id });

      res.json(deletedConcert);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };

module.exports = router;