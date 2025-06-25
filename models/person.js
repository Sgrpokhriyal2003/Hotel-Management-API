const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    age: {
        type: Number,
    },

    work: {
        type: String,
        required: true,
        enum: ["waiter", "chef", "manager"],
    },

    mobile:{
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    address: {
        type: String,
    },

    salary:{
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    }
});

//hash the password before saving in the db
personSchema.pre("save", async function(next){
    const person = this;
    if(!person.isModified('password')) return next();

    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(person.password, salt);
        person.password = hashedPassword;
        next();
    }
    catch(error){
        next(error);
    }
});

//compare hashedPass With Given During Login
personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }
    catch(error){
        throw err;
    }
}

const User = mongoose.model('User', personSchema);
module.exports = User;