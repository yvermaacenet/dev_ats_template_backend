const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect(
    // "mongodb://localhost:27017/ats_template"
    // "mongodb+srv://system:Qwerty%40123@cluster0.6j0zuoz.mongodb.net/awf_development?retryWrites=true&w=majority"
    // "mongodb+srv://yogendra:AceNet%40123@cluster0.w9ehftd.mongodb.net/awf_dev?retryWrites=true&w=majority"
    // "mongodb+srv://system:Qwerty%40123@cluster1.uxip7iy.mongodb.net/awf_development?retryWrites=true&w=majority"
    "mongodb+srv://system:Qwerty%40123@cluster1.uxip7iy.mongodb.net/awf_production?retryWrites=true&w=majority"
  )

  .then(() => console.log("Connection is successfull"))
  .catch((err) => `Connection is not successfully - ${err}`);
