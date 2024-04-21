const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://harshku068:harshku068@cluster0.njb19qt.mongodb.net/Location')
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((error) => {
    console.log("DB not Connected", error);
});

const locationSchema = new mongoose.Schema({
    gpsName: { type: Number, unique: true },
    latitude: Number,
    longitude: Number,
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;