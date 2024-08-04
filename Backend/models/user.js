const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');
const bcrypt = require('bcrypt');


const userModel = new mongoose.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, },
    password: { type: String,required:true  },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
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

userModel.plugin(plm);
module.exports = mongoose.model('User',userModel)