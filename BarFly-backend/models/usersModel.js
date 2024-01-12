import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Objectscheme/-model for database
const usersSchema = new Schema({
    nickname: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
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
    favourites: [{ type: mongoose.Types.ObjectId, ref: 'Location'}],
    isAdmin: {type: Boolean, default: false},
    isBarFly: {type: Boolean, default: false},
    birthDay: {type: Number, required: true},
    birthMonth: {type: Number, required: true},
    birthYear: {type: Number, required: true},
    age: {type: Number, default: 0},
    unlockKey: String,
    unlockEndsAt: Number,
    activated: {type: Boolean, default: false}
},
{ timestamps: true }
);

// saving passwords in a different collection for extra security
const passwordsSchema = new Schema({
    password: {type: String, required: true},
    user: {type: mongoose.Types.ObjectId, required: true, unique: true, ref: 'User'}
},
{timestamps: true}
);

export const User = mongoose.model('User', usersSchema);
export const Password = mongoose.model('Password', passwordsSchema);