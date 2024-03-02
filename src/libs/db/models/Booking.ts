const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "plase provide a name"],
    },
    email: {
        type: String,
        required: [true, "plase provide a name"],
    },
    datetime: { type: Date, require: true, unique: true }
})

const Booking = mongoose.models.Bookings || mongoose.mongoose.model('Bookings', BookingSchema)

export default Booking