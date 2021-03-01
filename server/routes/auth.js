const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const {error} = validate(req.body.user);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Nepravilno unet email ili lozinka.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Nepravilno unet email ili lozinka.');

    const token = user.generateAuthToken();

    return res.status(200).json({
        title:'uspešno logovanje',
        token: token
    })
});

function validate(req){
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required()
    })
    return schema.validate(req);
}

module.exports = router;