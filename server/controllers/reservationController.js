import Reservation from '../models/reservation.js';

export const list = async (reg, res) => {
    try {
        const reservations = await Reservation.find();

        res.status(200).json(reservations);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const store = async (req, res) => {
    const reservation = req.body;
    const newReservation = new Reservation(reservation);

    try {
        await newReservation.save();

        res.status(201).json(newReservation);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}