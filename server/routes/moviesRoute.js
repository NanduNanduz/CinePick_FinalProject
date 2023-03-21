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


module.exports = router;