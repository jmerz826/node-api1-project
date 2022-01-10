const express = require('express');

// INSTANCE OF EXPRESS APP
const server = express();

// GLOBAL MIDDLEWARE
server.use(express.json());

// ENDPOINTS

module.exports = server;
