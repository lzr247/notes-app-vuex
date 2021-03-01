const express = require('express');
const users = require('../routes/users');
const auth = require('../routes/auth');
const notes = require('../routes/notes');
const cors = require('cors');

module.exports = function(app){
    app.use(express.json());
    app.use(cors());
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/notes', notes);
}