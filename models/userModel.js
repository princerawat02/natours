const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,  
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            // Only works on CREATE & SAVE !!! not works with update or any
            validator: function(el) {
                return el === this.password 
            },
            message: "Passwords are not same"
        }
    }
})

//Document Middleware // runs before saving data to DB
userSchema.pre('save' , async function(next)  {
    //Only run this func if password was actually modified
    if(!this.isModified('password')) return next();

    // Hash the password with cost 12
    this.password = await bcrypt.hash(this.password, 12)

    // Delete password confirm field
    this.passwordConfirm = undefined
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User