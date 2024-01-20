import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const favouriteLocationsSchema = new Schema({
    user: {type: mongoose.Types.ObjectId, ref: 'User'},
    location: {type: mongoose.Types.ObjectId, ref: 'Location'}
},
{ timestamps: true }
);

export const FavouriteLocation = mongoose.model('FavouriteLocation', favouriteLocationsSchema);