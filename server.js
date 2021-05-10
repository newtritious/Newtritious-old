// Require external packages
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// Declare instance of Express
const app = express();

// Declare value for PORT
const PORT = process.env.PORT || 3001;

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('client/build'));
if (process.env.PRODUCTION_URL) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });
}

// Mongoose connection string
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost/alumni-collab', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB', err);
  });

// Routes defined here
require('./routes/routes')(app);
require('./routes/spoonacular-api')(app);

// Set Express server to listen on PORT
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
