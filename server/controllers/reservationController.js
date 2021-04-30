import mongoose from 'mongoose';
import Reservation from '../models/reservation.js';
import { sendAPI } from '../services/api.js';
import roomDetails from '../templates/roomDetails.js';

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

    const sender_psid = reservation.psId;
    
    const newReservation = new Reservation(reservation);

    try {
        const { _id } = await newReservation.save();

        const responses = roomDetails({
            fullName: reservation.fullName,
            bedNumber: reservation.bedNumber,
            noOfDays: reservation.noOfDays,
            senderPsid: sender_psid,
            reservationId: _id
        })

        for(let i=0; i<responses.length; i++)
        {
            await sendAPI(sender_psid, responses[i]);
        }

        res.status(201).json(newReservation);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const modify = async (req, res) => {
    let response = { 
        "text": "We will just validate your payment and process your booking. You will received a message once done. Thank you!"
    }

    const { id } = req.params;
    const reservation = req.body;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({ message: "record id not valid!" });
    }

    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(id, reservation, { new: true });

        if(reservation.psId)
        {
            await sendAPI(reservation.psId, response);
        }

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

export const view = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({ message: "record id not valid!" });
    }

    try {
        const reservation = await Reservation.findById(id);

        res.status(201).json(reservation);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}