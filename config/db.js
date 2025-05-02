const mongoose = require("mongoose");
const MONGODB_LIVE_URI = "mongodb+srv://realtonrix:TnXXu7J2XM4blDM3@cluster0.io5bi.mongodb.net/bookshop?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGODB_LIVE_URI);
mongoose.connection
  .on("open", () => {
    console.log("Connected to Database");
  })
  .once("error", () => {
    console.log("Failed to connect to Database");
  });

module.exports = mongoose;