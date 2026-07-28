const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const contactRoute = require('./contact');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// just to get something
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', contactRoute);

app.listen(3000, () => console.log('Server running on port 3000'));