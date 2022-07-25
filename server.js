'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);

const getBooks = require('./endpointHandlers/Books');

app.get('/test', (request, response) => { response.send('test request received'); });

app.get('/books', getBooks);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
