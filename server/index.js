const express = require('express');

const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();


// Database Connection
mongoose.connect("mongodb+srv://keshav:keshav@cluster0.59kuurh.mongodb.net/?retryWrites=true&w=majority")
.then(() => console.log('Database connection established'))
.catch((err)=> console.log('Error connecting',err))

// middleware
app.use(express.json());
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
// For adding cookies to our website
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));


const port = 8000;
app.listen(port,()=>console.log(`listening on port ${port}`));


app.use('/',require('./routes/authRoutes.js'));
