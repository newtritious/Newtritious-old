// Require external packages
require('dotenv').config();
require('./db/mongoose');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const path = require('path')
// Declare instance of Express
const app = express();

// Declare value for PORT
const PORT = process.env.PORT || 8080;

// Express middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static('client/build'));

// Routes defined here
require('./routes/routes')(app);
require('./routes/recipes')(app);
require('./routes/spoonacular-api')(app);

if (process.env.NODE_ENV === "production") {
  // app.get('*', (req, res) => {
  app.use(express.static('client/build'));
  // res.sendFile(path.join(__dirname, 'client/build/index.html'));
  //});
}
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'))
})
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


// Set Express server to listen on PORT
app.listen(PORT, () => {
  console.log(`🌍 Server running on http://localhost:${PORT}`);
});
