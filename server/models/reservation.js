import mongoose from 'mongoose';

const reservationSchema = mongoose.Schema({
    fullName: String,
    bedNumber: Number,
    dateFrom: Date,
    dateTo: Date,
    validId: String,
    paymentProof: {
        type: String,
        default: null
    },
    psId: {
        type: String,
        default: null
    },
    messengerId: {
        type: String,
        default: null
    },
    status: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        defaul: new Date()
    }
})

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;