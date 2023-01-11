// set environment variables
require('dotenv').config();
require('module-alias/register');

// import third-party
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const { Server: SocketServer } = require('socket.io');

// import local file
const corsConfig = require('~/configs/cors.config');
const { MAX, BASE_URL } = require('~/constant');
const { authorization } = require('~/middleware/authorize.middleware');
const { getEnv } = require('~/helper');
const { SOCKET_EVENTS, IO_EVENTS } = require('~/constant/socket');

const authApi = require('~/apis/auth.api');
const userApi = require('~/apis/user.api');
const accountApi = require('~/apis/account.api');
const groupApi = require('~/apis/group.api');
const presentationApi = require('~/apis/presentation.api');
const { whitelist } = require('~/middleware/whitelist.middleware');

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

// ================== socket ==================
const httpServer = http.createServer(app);
const io = new SocketServer(httpServer, { cors: '*' });

// Presentation Io
io.on('connection', (socket) => {
  let presentationId = '',
    isHost = false;

  const presentRoomWithHost = () =>
    `present-${isHost ? 'host' : 'member'}-${presentationId}`;
  const presentRoom = () => `present-${presentationId}`;

  // Join presentation
  socket.on(SOCKET_EVENTS.JOIN_PRESENTATION, (data) => {
    presentationId = data.presentationId;
    isHost = data.isHost;
    socket.join([presentRoomWithHost(), presentRoom()]);
  });

  // Leave presentation
  socket.on(SOCKET_EVENTS.LEAVE_PRESENTATION, () => {
    socket.leave([presentRoomWithHost(), presentRoom()]);
  });

  // Update presentation
  socket.on(SOCKET_EVENTS.UPDATE_PRESENTATION, (updateFields) => {
    io.to(presentRoom()).emit(IO_EVENTS.UPDATE_PRESENTATION, {
      from: socket.id,
      updateFields,
    });
  });
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
app.use(
  `${BASE_URL}/presentation`,
  whitelist(['check-code', 'get-by-code', 'update-answers']),
  authorization,
  presentationApi,
);
app.get(`${BASE_URL}/test`, (_, res) => {
  res.status(200).json({ msg: 'Success' });
});

// ================== Listening ... ==================
httpServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} !`);
});
