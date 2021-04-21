import mongoose from 'mongoose';
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

export const modify = async (req, res) => {
    const { id } = req.params;
    const reservation = req.body;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({ message: "record id not valid!" });
    }

    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(id, reservation, { new: true });

        res.status(201).json(updatedReservation);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const destroy = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({ message: "record id not valid!" });
    }

    try {
        await Reservation.findByIdAndRemove(id);

        res.status(204).json({ message: "record deleted!" });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}