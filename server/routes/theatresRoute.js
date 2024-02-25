const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Theatre = require("../models/theatreModel");
const Show = require("../models/showModel");

//add theatre

router.post("/add-theatre", async (req, res) => {
  try {
    const newTheatre = new Theatre(req.body);
    await newTheatre.save();
    res.send({
      success: true,
      message: "Theatre added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//get all theatre

router.get("/get-all-theatres", async (req, res) => {
  try {
    const theatres = await Theatre.find().sort({ createdAt: -1 });
    res.send({
      success: true,
      mmessage: "Theatres fetched Succesfully",
      data: theatres,
    });
  } catch (error) {
    req.send({
      success: false,
      message: error.message,
    });
  }
});

//get all theatres by owner
router.post("/get-all-theatres-by-owner", async (req, res) => {
  try {
    const theatres = await Theatre.find({ owner: req.body.owner }).sort({
      createdAt: -1,
    });
    res.send({
      success: true,
      message: "Theatres fetched successfully",
      data: theatres,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// update theatre
router.post("/update-theatre", async (req, res) => {
  try {
    await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);
    res.send({
      success: true,
      message: "Theatre updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//delete theatre
router.post("/delete-theatre", async (req, res) => {
  try {
    await Theatre.findByIdAndDelete(req.body.theatreId);
    res.send({
      success: true,
      message: "Theatre deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//add new show
router.post("/add-show", async (req, res) => {
  try {
    const newShow = new Show(req.body);
    await newShow.save();
    res.send({
      success: true,
      message: "Show added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//get all shows by theatre
router.post("/get-all-shows-by-theatre", async (req, res) => {
  try {
    const shows = await Show.find({ theatre: req.body.theatreId })
      //get the complete movie object
      .populate("movie")
      .sort({
        createdAt: -1,
      });
    res.send({
      success: true,
      message: "Shows fetched successfully",
      data: shows,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//delete show
router.post("/delete-show", async (req, res) => {
  try {
    await Show.findByIdAndDelete(req.body.showId);
    res.send({
      success: true,
      message: "Show deleted successfully.",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//get all unique theatre which have shows of a movie (input will be only date and the movie )
router.post("/get-all-theatres-by-movie", async (req, res) => {
  try {
    const { movie, date } = req.body;
    //find(fetching) all shows of a movie
    const shows = await Show.find({ movie, date })
      .populate("theatre")
      .sort({ createdAt: -1 });

    //get all unique theatre(removing duplicate theatre and adding the shows in a paticular day for that movie)

    let uniqueTheatres = [];
    shows.forEach((show) => {
      const theatre = uniqueTheatres.find(
        (theatre) => theatre._id == show.theatre._id
      );

      if (!theatre) {
        const showsForThisTheatre = shows.filter(
          (showObj) => showObj.theatre._id == show.theatre._id
        );
        uniqueTheatres.push({
          ...show.theatre._doc,
          shows: showsForThisTheatre,
        });
      }
    });
    res.send({
      success: true,
      message: "Theatres fetched successfully",
      data: uniqueTheatres,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
