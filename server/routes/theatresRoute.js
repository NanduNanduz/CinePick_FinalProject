const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Theatre = require("../models/theatreModel");


//add theatre

 router.post("/add-theatre", async(req,res)=>{
    try {
        const newTheatre =  new Theatre(req.body);
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

 router.get("/get-all-theatres",async(req,res)=>{
    try {
        const theatres = await Theatre.find().sort({createdAt: -1});
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
 router.post("/get-all-theatres-by-owner",async(req,res)=>{
    try {
        const theatres = await Theatre.find({owner: req.body.owner }).sort({createdAt: -1 });
        res.send({
            success: true,
            message: "Theatres fetched successfully" ,
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
 router.post("/update-theatre", async(req,res)=>{
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
 router.post("/delete-theatre", async(req,res)=>{
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

 module.exports = router;
