import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const favouriteToursSchema = new Schema({
    user: {type: mongoose.Types.ObjectId, ref: 'User'},
    tour: {type: mongoose.Types.ObjectId, ref: 'Tour'}
},
{ timestamps: true }
);

export const FavouriteTour = mongoose.model('FavouriteTour', favouriteToursSchema);