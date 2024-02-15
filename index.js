const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 8000;

mongoose.connect('');

const MySchema = mongoose.Schema({
  breed: { type: String },
  live_weight: { type: Number },
  animal_image: { type: String },
});

const animalBreed = mongoose.model('animalBreeds', MySchema);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'Image'); 
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  

const upload = multer({ storage: storage });

app.use(express.json());

app.post('/api/addRecord', upload.single('animalImage'), async (req, res) => {
    try {
    const { breed, live_weight } = req.body;

    if (!['cholistani', 'nili ravi'].includes(breed.toLowerCase())) {
      return res.status(400).json({ message: 'Breed must be cholistani or nili ravi' });
    }

    const newRecord = new animalBreed({
      breed: breed,
      live_weight: live_weight,
      animal_image: req.file.path,
    });

    await newRecord.save();

    res.status(201).json({ message: 'Record added successfully', data: newRecord });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/api/getRecord/:id', async (req, res) => {
  try {
    const record = await animalBreed.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.status(200).json({ data: record });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`connected on https://localhost${PORT}`);
});
