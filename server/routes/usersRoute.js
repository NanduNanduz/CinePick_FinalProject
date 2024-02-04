const router = require("express").Router();
const User = require('../models/userModel');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const authMiddleware = require("../middlewares/authMiddleware");

//register a new user(API Structure)
router.post('/register', async (req, res) => {
    try {

        //check if the user already exists or not
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.send({
                success: false,
                message: "User already exists",
            });
        }

        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        //save the user or create a new user
        const newUser = new User(req.body);
        await newUser.save();

        res.send({ success: true, message: "user created successfully" });


    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

//Login  a user
router.post("/login", async (req, res) => {
    try {
        //cheking if user is exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.send({
                success: false,
                message: "User does not exist ",
            });
        }

        // check if password is correct
        const validPassword = await bcrypt.compare(
            req.body.password,//plane password
            user.password//hashed password
        );

        if (!validPassword) {
            return res.send({
                success: false,
                message: "Invalid Password",
            });
        }

        //create and assign a token(userId in an object)
        //sign method taking 3 parameters:
        //1.data that you are encrypting
        //2.Secret key
        //3.validity(expires in one day ,after 24 hrs have to reload )
        const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {

            expiresIn: "1d",
        });


        res.send({
            success: true,
            //sending the data as token for the front end, front end will store this data and put it in the local storage so after the login successful , it will send this token every time for the protected routes.
            //So the backend will validate the token if the userId is present in the db then only it will sent the response
            message: "User logged in successfully" , data : token});
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});


//get user details by id
//protected route, validate the token which the front end is sending 
router.get('/get-current-user',authMiddleware, async (req, res) => {
    try {
        
        const user = await User.findById(req.body.userId).select('-password')
        res.send({
            success: true,
            message: "User details fetched succesfully",
            data: user,
        });

    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        })

    }
});

module.exports = router;