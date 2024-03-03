const express= require('express')
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
app.use (express.json())

const usersRoute = require("./routes/usersRoute");
const moviesRoute = require("./routes/moviesRoute");
const theatresRoute = require("./routes/theatresRoute");
const bookingsRoute = require("./routes/bookingsRoute");


app.use("/api/users",usersRoute);
app.use("/api/movies",moviesRoute);
app.use("/api/theatres",theatresRoute);
app.use("/api/bookings",bookingsRoute);

const port  = process.env.PORT || 5000;




const path = require("path");
__dirname = path.resolve();
// render deployment
//check env is development or production , then only it will execute the logic 
if (process.env.NODE_ENV === "production") {
    //line tell the compiler which is our client / which is static related data
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    //just need to send index.html to the client because we are building a single page application so only one html file to render on the browser
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}






app.listen(port, () => 
console.log(`Node js server is running  on port ${port}`)
);