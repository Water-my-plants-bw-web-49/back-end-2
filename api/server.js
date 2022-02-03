const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRouter = require('./auth/auth-router')
const plantsRouter = require('./plants/plants-router')
const restricted = require('./restricted')
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
server.use('/api/auth', authRouter)
server.use('/api/plants', plantsRouter)


server.use((err, req, res, next) => { 
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    });
  });

module.exports = server;