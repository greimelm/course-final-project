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
    openingHours: {type: String, required: true},
    menu: {type: String},
    reservationLink: {type: String},
    birthDay: {type: Number, required: true},
    birthMonth: {type: Number, required: true},
    birthYear: {type: Number, required: true},
    smallDescription: {type: String, required: true},
    detailedDescription: {type: String, required: true},
    unlockKey: String,
    unlockEndsAt: Number,
    activated: {type: Boolean, default: false}
},
{ timestamps: true}
);

export const Location = mongoose.model('Location', locationsSchema);