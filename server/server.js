const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const URI = require('./config');
const notepadRoutes = require('./routes');

mongoose
  .connect(URI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected.'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 1337;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v1/ntpd', notepadRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
