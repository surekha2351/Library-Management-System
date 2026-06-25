const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Adding family: 4 forces IPv4, and serverSelectionTimeout gives it extra time
        await mongoose.connect(process.env.DATABASE_URL, {
            family: 4,
            serverSelectionTimeoutMS: 5000
        });
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error('MongoDB Connection Failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;