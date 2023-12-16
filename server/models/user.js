const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
        
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        confirmPassword: {
                type: String,
                required: true
        }
});

const UserModel = mongoose.model('User',userSchema);

module.exports  = UserModel;