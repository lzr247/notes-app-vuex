const {Note, validate} = require('../models/note');
const express = require('express');
const router = express.Router();
const {getCurrentDate} = require('../StaticMethods');
const StaticMethods = require('../StaticMethods');
const Joi = require('joi');
const {authBodyToken, auth, authHeadersToken} = require('../middleware/auth');

//beleske jednog korisnika
router.get('/', auth, async (req, res) => {
    const notes = await Note.find({ userEmail: req.user.email });
    return res.send(notes);
});
//pravljenje nove beleske
router.post('/', authBodyToken, async (req, res) => {
    const {error} = validateNote(req.body.data);
    if(error) return res.status(400).send(error.details[0].message);
    const today = getCurrentDate();
    const note = new Note({
        title: req.body.data.title,
        content: req.body.data.content,
        date: today,
        userEmail: req.user.email
    });
    await note.save();
    const notes = await Note.find({ userEmail: req.user.email});
    return res.status(200).send(notes);
});
//prikaz odredjene beleske
router.get('/showNote', auth, async (req, res) => {
    const note = await Note.findById(req.body._id);
    return res.send(note);
});
//edit odredjene beleske
router.put('/', authBodyToken, async (req, res) => {
    const {error} = validateNoteId(req.body.data);
    if(error) return res.status(400).send(error.details[0].message);

    const today = StaticMethods.getCurrentDate();

    const note = await Note.findByIdAndUpdate(req.body.data.id, {
        title: req.body.data.title,
        content: req.body.data.content,
        date: today
    }, { new: true });
    if(!note) return res.status(400).send('Beleška ne postoji.');
    const notes = await Note.find({ userEmail: req.user.email });
    return res.send(notes);
});
//brisanje odredjene beleske
router.delete('/', authHeadersToken, async (req, res) => {
    const note = await Note.findByIdAndRemove(req.body.id);
    if(!note) return res.status(400).send('Beleška ne postoji.');
    const notes = await Note.find({ userEmail: req.user.email });
    return res.send(notes); 
});

function validateNote(note){
    const schema = Joi.object({
        title: Joi.string().min(1).max(30).required(),
        content: Joi.string().min(1).max(10000).required(),
    });
    return schema.validate(note);
}
function validateNoteId(note){
    const schema = Joi.object({
        id: Joi.string().required(),
        title: Joi.string().min(1).max(30).required(),
        content: Joi.string().min(1).max(10000).required(),
    });
    return schema.validate(note);
}

module.exports = router;