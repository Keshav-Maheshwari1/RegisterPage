const User = require('../models/user');
const {hashPassword,comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken');

const test = (req,res)=>{
        res.json('test is working')
}

const JWT_SECRET = "1241234411";

// Register EndPoint
const registerUser = async (req, res)=>{
        try{
                const{email,password,confirmPassword} = req.body;
                // Check if email is entered
                if(!email){
                        return res.json({
                                message: 'Please enter email'
                        })
                }
                // Check if password is entered
                if(!password || password.length < 6){
                        return res.json({
                                message: 'Password is required and should be at least 6 characters long'
                        })
                }

                // Check if confirm password is entered
                if(!confirmPassword){
                        return res.json({
                                message: 'Please enter confirm password'
                        })
                }
                // Check if password and confirm password are same
                if(password!== confirmPassword){
                        return res.json({
                                message: 'Password and confirm password are not same'
                        })
                }
                // Check if email is already registered
                const exist = await User.findOne({email});
                if(exist){
                        return res.json({
                                message: 'Email is already registered'
                        })
                }
                const hashedPassword = await hashPassword(password);
                
                // create user in database
                const user = await User.create({
                        email,
                        password : hashedPassword,
                        confirmPassword : hashedPassword
                });
                return res.json({
                        user
                })
        }catch(message){
                console.log(message)
        }
};

// Login Endpoint

const loginUser = async (req, res) => {
        try {
                const{email,password} = req.body;
                
                // Check If User Exists
                const user = await User.findOne({email});
                if(!user){
                        return res.json({
                                message: 'User does not exist'
                        })
                }

                // Check if entered password is correct or not
                const match = await comparePassword(password, user.password)
                if(match){
                        jwt.sign({ email: user.email, id: user._id }, JWT_SECRET , {}, (err, token) => {
                                if (err) {
                                    throw err;
                                }
                                res.cookie('token', token); // Set the cookie
                                res.json(user); // Send the response
                        });
                }
                if(!match){
                        res.json({
                                message: 'Password does not match'
                        })
                }


        } catch (message) {
                console.log(message);
        }
}

const getProfile = (req, res) => {
        const {token} = req.cookies
        if(token){
                jwt.verify(token,JWT_SECRET,{},(err,user)=>{
                        if(err){
                                throw err;
                        }
                        res.json(user); // Send the response

                })
        }
        else{
                res.json(null)
        }
}

module.exports = {
        test,
        registerUser,
        loginUser,
        getProfile
};