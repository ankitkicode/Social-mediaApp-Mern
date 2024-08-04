const mongoose = require('mongoose');
const dbUri = 'mongodb://localhost:27017/SocialMediaApp-insta'; // Replace with your MongoDB URI

const connectDB = async () => {
    try {
        await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
        process.exit(1); // Exit process with failure code
    }
};

module.exports = connectDB;
