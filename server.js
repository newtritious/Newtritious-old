const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const routes = require('./routes');
require('dotenv').config();
require('./db/mongoose');

const PORT = process.env.PORT || 3001;

// Express middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('client/build'));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

if (process.env.PRODUCTION_URL) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });
}

// Routes defined here
app.use(routes);

app.listen(PORT, () => {
  console.log(`🌍 Server running on http://localhost:${PORT}`);
});
