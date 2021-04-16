import mongoose from 'mongoose';

const reservationSchema = mongoose.Schema({
    fullName: String,
    bedNumber: Number,
    dateFrom: Date,
    dateTo: Date,
    validId: String,
    messengerId: {
        type: String,
        default: null
    },
    status: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        defaul: new Date()
    }
})

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;