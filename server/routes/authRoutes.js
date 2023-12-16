const express = require('express');
const router = express.Router();
const cors = require('cors');
const {test, registerUser, loginUser,getProfile} = require('../controllers/authController.js');      

// middleware
router.use(
        cors(
                {
                        origin: 'http://localhost:3000',
                        credentials: true
                }
        )
)

router.get('/',test)
router.post('/Register',registerUser)
router.post('/Login',loginUser)
router.get('/profile',getProfile)


module.exports = router;