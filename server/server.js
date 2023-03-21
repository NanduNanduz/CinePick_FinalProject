const express= require('express')
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
app.use (express.json())

const usersRoute = require("./routes/usersRoute");
const moviesRoute = require("./routes/moviesRoute");


app.use("/api/users",usersRoute);
app.use("/api/movies",moviesRoute);


const port  = process.env.PORT || 5000;
app.listen(port, () => 
console.log(`Node js server is running  on port ${port}`)
);