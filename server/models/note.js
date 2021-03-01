const Joi = require('joi');
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength:30,
        minlength:1
    },
    content: {
        type: String,
        required: true,
        minlength:1,
        maxlength:10000
    },
    date:{
        type: String,
        required: true
    },
    userEmail:{
        type: String,
        required: true
    }
});

const Note = mongoose.model('Note', noteSchema);

function validateNote(note){
    const schema = Joi.object({
        title: Joi.string().min(1).max(30).required(),
        content: Joi.string().min(1).max(10000).required(),
        // date: Joi.string().required(),
        userEmail: Joi.string().required()
    });
    return schema.validate(note);
}

module.exports.Note = Note;
module.exports.validate = validateNote;