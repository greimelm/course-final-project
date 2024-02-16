import * as dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';

import HttpError from './models/http-errors.js';

import router from './routes/router.js';

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

// custom helmet configuration to avoid basic cybersecurity threads
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            scriptSrc: ["'unsafe-inline'", "'self'"]
        }
    })
);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors());

// Form body parser
app.use(express.urlencoded({ extended: true }));

// JSON parser
app.use(express.json());



app.get('/', (req, res) => {
    res.send("Root wurde aufgerufen");
});


app.use('/api', router);

app.use(() => {
    throw new HttpError("Could not find route", 404);
});

// central error handling
app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error);
    }

    res.status(error.errorCode || 500).json({ message: error.message || "Unknown error" });
});

// connecting to MongoDB data base
const CONNECTION_STRING = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@barflycluster.plqmhvr.mongodb.net/`;

mongoose
    .connect(CONNECTION_STRING)
    .then(() => {
        // starting web server
        app.listen(PORT, () => {
            console.log("Express Server läuft unter Port " + PORT);
        });
    })
    .catch((error) => {
        console.log("Connection to database not possible!", error);
    });