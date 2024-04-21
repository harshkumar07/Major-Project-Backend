const express = require('express');
const Location = require('./db.js')

const app = express();
const PORT = 4000;

app.use(express.json());

app.post('/api/location', async (req, res) => {
    try {
        const { gpsName, latitude, longitude } = req.body;
        const location = new Location({ gpsName, latitude, longitude });
        await location.save();
        console.log('Location saved:', location);
        return res.status(201).json({ message: 'Location data saved successfully' });
    } catch (error) {
        console.error('Error saving location:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.patch('/api/location', async (req, res) => {
    try {
        const gpsName = 1;
        const { latitude, longitude } = req.body;
        
        let location = await Location.findOne({ gpsName });

        if (location) {
            if (latitude !== undefined) location.latitude = latitude;
            if (longitude !== undefined) location.longitude = longitude;
            await location.save();
            console.log('Location updated:', location);
            return res.status(200).json({ message: 'Location data updated successfully', location });
        } else {
            return res.status(404).json({ error: 'Location data not found' });
        }
    } catch (error) {
        console.error('Error updating location:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/location', async (req, res) => {
    try {
        const locations = await Location.find({});
        return res.status(200).json(locations);
    } catch (error) {
        console.error('Error fetching locations:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});