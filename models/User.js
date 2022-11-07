const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({ 
    id:{ // ID
        type: String,
        required: true,
        maxlength: 10,
        unique:1
    },
    password: { // 비밀번호
        type: String,
        required: true,
        maxlength: 20
    },
    usermail: { // 사용자이메일
        type: String,
        required: true,
        maxlength: 40,
        unique:1
    },
    residence: { // 주소
        type: String,
        required: true
    },
})

UserSchema.pre('save', function( next ) {
    var user = this; 

    // 비밀번호가 변경되었을 때에만 동작하도록 (다른 필드 X)
    if (user.isModified('password')) { 
        // 비밀번호를 암호화
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                // Store hash in your password DB.
                user.password = hash 
                next()   
            });
        });
    } else {
        next()
    }
    
})

UserSchema.methods.comparePassword = function(plainPassword, cb) {

    //plainPassword:   암호화된비밀번호:  
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch)
    })
}



const User = mongoose.model('User', UserSchema)

module.exports = { User }
