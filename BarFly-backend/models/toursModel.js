import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const toursSchema = new Schema({
    name: {type: String, required: true, unique: true},
    photo: {
        cloudinaryPublicId: {type: String, required: true},
        url: {type: String, required: true}
    },
    city: {type: String, required: true},
    locations: [{ type: mongoose.Types.ObjectId, required: true, unique: true, ref: 'Location'}],
    categories: [{type: String}],
    smallDescription: {type: String},
},
{ timestamps: true}
);

export const Tour = mongoose.model('Tour', toursSchema); 