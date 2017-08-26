const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const mongoose = require('./database/mongoose');
const users = require('./routes/users');
const config = require('./config.json');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/api/users', users);

app.listen(config.DEV.PORT, () => console.log(`Started on port ${config.DEV.PORT}`));