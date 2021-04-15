import Photo from '../models/photo.js';

export const list = async (reg, res) => {
    try {
        const photos = await Photo.find();

        res.status(200).json(photos);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const store = async (req, res) => {
    const photo = req.body;
    const newPhoto = new Photo(photo);

    try {
        await newPhoto.save();

        res.status(201).json(newPhoto);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}