'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3001;

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);

const bookRouteHandler = require('./routeHandlers/Books');
app.use('/books', bookRouteHandler);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
