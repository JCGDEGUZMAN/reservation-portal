import mongoose from 'mongoose';

const photoSchema = mongoose.Schema({
    photo: String,
    description: String,
    likeCount: {
        type: Number,
        default: 0
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

const Photo = mongoose.model('Photo', photoSchema);

export default Photo;