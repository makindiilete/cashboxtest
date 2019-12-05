//We load all our route files here (we only have one currently)
const withdrawalRouter = require("./routers/withdrawal");

//loading our mongoose.js file where we have the code for connecting to database
require("./db/mongoose");
/*Creating our server*/
const express = require("express");
const app = express();

//Enable CORS for all HTTP methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json()); //passing json to obj automatically
app.use(withdrawalRouter); //registering our withdrawalRouter

//2-  We define our port
// const port = process.env.PORT;
const port = process.env.PORT || 3000;

//3-  Then we call on listen
app.listen(port, () => {
  console.log("Server is up and running on " + port);
});

module.exports = app;
