const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const eventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: false },
    location: { type: String, required: true },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
