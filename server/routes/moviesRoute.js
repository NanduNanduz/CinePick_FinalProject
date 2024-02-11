const router = require('express').Router();
const Movie = require('../models/movieModel');
const authMiddleware = require('../middlewares/authMiddleware');

// Add a new movie

router.post('/add-movie', authMiddleware, async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.send({
            success: true,
            message: "Movie added Successfully"
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});


//get all movies 
router.get("/get-all-movies",async (req,res) =>{
    try {
        //sort the latest added to list as 1st one 
        const movies = await Movie.find().sort({ createdAt: -1});
        res.send({
            success:true,
            message:"Movies fetched successfully ",
            data : movies,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});


//update a movie
router.post("/update-movie",authMiddleware,async(req,res) => {

    try {
        await Movie.findByIdAndUpdate(req.body.movieId, req.body);
        res.send({
            success: true,
            message: "Movie updated succesfully",
        });
        
    } catch (error) {
        res.send({
            success: false,
            message:error.message,
        });
    }
});

//delete a movie 
router.post("/delete-movie",authMiddleware,async(req, res) => {
    try {
        await Movie.findByIdAndDelete(req.body.movieId);
        res.send({
            success: true,
            message: "Movie deleted succesfully",
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        }) ;
    }
});

module.exports = router;