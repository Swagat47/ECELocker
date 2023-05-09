import mongoose from "mongoose";

const URI = process.env.MONGODB_URL;
//console.log(URI);
mongoose.connect(`${URI}`, (err) => {
  if (err) throw err;
  //console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
  console.log("Connected to MongoDB!!!");
});
