const {User, validate} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {auth} = require('../middleware/auth');

router.get('/me', auth, async (req, res) => {
    const user = await User.find({ email: req.user.email}).select('name');
    if(!user) return res.status(404).send('Korisnik nije pronađen.');
    return res.send(user);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if(user) return res.status(400).send('Korisnik već postoji.');

    user =  new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    await user.save();
    const token = user.generateAuthToken();

    return res.status(201).json({
        title: 'Uspešna registracija.',
        token: token
    })
});

module.exports = router;