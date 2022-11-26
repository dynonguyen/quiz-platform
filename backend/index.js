// set environment variables
require('dotenv').config();
require('module-alias/register');

// import third-party
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');

// import local file
const corsConfig = require('~/configs/cors.config');
const { MAX, BASE_URL } = require('~/constant');
const { authorization } = require('~/middleware/authorize.middleware');
const { getEnv } = require('~/helper');

const authApi = require('~/apis/auth.api');
const userApi = require('~/apis/user.api');
const accountApi = require('~/apis/account.api');
const groupApi = require('~/apis/group.api');

// ================== set port ==================
const app = express();
const normalizePort = (port) => parseInt(port, 10);
const PORT = normalizePort(getEnv('PORT') || 3000);

// ================== setup ==================
const isDevMode = getEnv('NODE_ENV') !== 'production';

if (!isDevMode) {
  app.disable('x-powered-by');
  app.use(morgan('common'));
} else {
  app.use(morgan('dev'));
}

// ================== Connect mongodb with mongoose ==================
const mongoose = require('mongoose');
const GroupModel = require('~/models/group.model');
const MONGO_URL = getEnv('MONGO_URL');

mongoose
  .connect(MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((error) => {
    console.log(`MongoDB connect failed: ${error}`);
    process.exit(-1);
  });

// ================== config ==================
app.use(express.json({ limit: MAX.SIZE_JSON_REQUEST }));
app.use(express.urlencoded({ limit: MAX.SIZE_JSON_REQUEST, extended: true }));
app.use(cookieParser());
app.use(cors(corsConfig));

// ================== Apis ==================
app.use(`${BASE_URL}/auth`, authApi);
app.use(`${BASE_URL}/group`, authorization, groupApi);
app.use(`${BASE_URL}/user`, authorization, userApi);
app.use(`${BASE_URL}/account`, authorization, accountApi);
app.get('/temp', async (req, res) => {
  try {
    await GroupModel.create({
      name: 'ABC',
      code: '123456',
      owner: '637902b3fe1f46d7c44cb8c3',
      coOwners: ['6381c58b9a0079fb64bbf0b6'],
      members: [],
    });
    res.send('hi');
  } catch (error) {
    console.log(error``);
  }
});

// ================== Listening ... ==================
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} !`);
});
