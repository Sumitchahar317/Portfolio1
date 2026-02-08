const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

async function connectMongo() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB Atlas using Mongoose");
    } catch (err) {
        console.error("Could not connect to MongoDB Atlas", err);
        process.exit(1);
    }
}
connectMongo();


// Routes
const profileRoutes = require('./src/routes/profileRoutes');
app.use('/api', profileRoutes);

// Serve Frontend
app.use(express.static(path.resolve(__dirname, '../frontend')));

// Liveness Check
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);
