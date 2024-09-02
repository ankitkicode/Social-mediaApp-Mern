const mongoose = require('mongoose');
// const plm = require('passport-local-mongoose');
const bcrypt = require('bcryptjs');


const userModel = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true, // Ensure usernames are unique
        trim: true // Trim whitespace
    },
    name: { 
        type: String, 
        required: true, 
        trim: true // Trim whitespace
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, // Ensure emails are unique
        trim: true,
        lowercase: true // Convert email to lowercase
    },
    password: { 
        type: String, 
        required: true 
    },
    bio: { 
        type: String, 
        trim: true // Trim whitespace
    },
    profilePicture: { 
        type: String, 
        default: 'https://cdn.vectorstock.com/i/1000v/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg' // Provide a default image path
    },
    followers: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' // Reference to User model
    }],
    following: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' // Reference to User model
    }],
    savedPosts: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post' // Reference to Post model
    }],
    reels: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Reel' // Reference to Reel model
    }],
    posts: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post' 
    }],
    date: { 
        type: Date, 
        default: Date.now 
    }
});


userModel.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});
// Instance method to compare passwords
userModel.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// userModel.plugin(plm);

module.exports = mongoose.model('User',userModel)