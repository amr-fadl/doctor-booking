const mongoose = require('mongoose');

const AvailabletimeSchema = new mongoose.Schema({
    datetime: { type: Date, require: true, unique: true },
    status: { type: String, default: 'available' },
})

const Availabletime = mongoose.models.Availabletimes || mongoose.mongoose.model('Availabletimes', AvailabletimeSchema)

export default Availabletime