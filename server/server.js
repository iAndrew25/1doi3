const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const mongoose = require('./database/mongoose');
const users = require('./routes/users');
const config = require('./config.json');

const app = express();

app.use(express.static(__dirname + '/../client/build'));
app.get('/', (req, res) => res.sendFile(path.join(__dirname + 'index.html')));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/users', users);

app.listen(config.DEV.PORT, () => console.log(`Started on port ${config.DEV.PORT}`));