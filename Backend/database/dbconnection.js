const mongoose = require('mongoose');
const dbUri = process.env.DATABASE_URL; // Replace with your MongoDB URI

const connectDB = async () => {
    try {
        await mongoose.connect(dbUri);
        console.log('MongoDB connected successfully');
       

    } catch (err) {
        console.error('Error connecting to MongoDB', err);
        process.exit(1); // Exit process with failure code
    }
};



module.exports = connectDB;
