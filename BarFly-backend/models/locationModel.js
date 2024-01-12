import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const locationsSchema = new Schema({
    name: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    owner: {type: mongoose.Types.ObjectId, ref: 'User'},
    street: {type: String, required: true},
    zip: {type: String, required: true},
    city: {type: String, required: true},
    photo: {
        cloudinaryPublicId: {type: String, required: true},
        url: {type: String, required: true}
    },
    geo: {
        lat: Number,
        lon: Number
    },
    categories: [{type: String}],
    openingDay: {type: Number, required: true},
    openingMonth: {type: Number, required: true},
    openingYear: {type: Number, required: true},
    smallDescription: {type: String, required: true},
    detailedDescription: {type: String, required: true},
    unlockKey: String,
    unlockEndsAt: Number,
    activated: {type: Boolean, default: false}
},
{ timestamps: true}
);

const locationPasswordsSchema = new Schema({
    locationPassword: {type: String, required: true},
    location: {type: mongoose.Types.ObjectId, ref: 'Location'}
},
{timestamps: true}
);

export const Location = mongoose.model('Location', locationsSchema);
export const LocationPassword = mongoose.model('LocationPassword', locationPasswordsSchema);