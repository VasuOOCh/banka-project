const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json())
const path = require('path')
app.use(express.urlencoded({extended:true}))

// Use body-parser to parse JSON (the content-type of the request)
app.use(bodyParser.json());

// Connect to MongoDB Atlas
const atlasUri = 'mongodb+srv://useratnesh:ratnesh321@cluster0.tuu2ppa.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your actual Atlas connection string

mongoose.connect(atlasUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB Atlas!');
})
.catch((err) => {
  console.error('Error connecting to MongoDB Atlas:', err);
});

// Define a schema for laborers
const labourSchema = new mongoose.Schema({
  name: { type: String, required: true },
  skill: { type: String, required: true },
  district: { type: String, required: true },
  mobileNumber: { type: String, required: true }
});

// Create a model for laborers
const Labour = mongoose.model('Labour', labourSchema);

// Route for laborer form submission
app.post('/submit_registration_form', async (req, res) => {
  console.log('Received registration form data:', req.body);

  const newLabour = new Labour({
    name: req.body.name,
    skill: req.body.skill,
    district: req.body.district,
    mobileNumber: req.body.mobileNumber
  });

  try {
    const savedLabour = await newLabour.save();
    console.log('Saved laborer:', savedLabour);
    res.status(200).send(`You are now registered. <a href="/">Return to Main Page</a>`);
  } catch (err) {
    console.error('Error saving laborer:', err);
    res.status(500).send(err);
  }
});

// Serve static files (e.g., index.html)
app.use(express.static('public'));

// Routes for other pages
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/registration.html', (req, res) => {
  res.sendFile(__dirname + '/registration.html');
});

// Route to get laborer data
app.get('/get_laborers', async (req, res) => {
  try {
    let query = {};
    if (req.query.skill && req.query.skill !== 'all') {
      query.skill = req.query.skill;
    }
    if (req.query.district && req.query.district !== 'all') {
      query.district = req.query.district;
    }
    const laborers = await Labour.find(query);
    res.status(200).json(laborers);
  } catch (err) {
    console.error('Error retrieving laborers:', err);
    res.status(500).json({ message: 'Error retrieving laborers', error: err });
  }
});

// Start the server on port 5000
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
