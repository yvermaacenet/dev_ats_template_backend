const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://system:Qwerty%40123@cluster1.uxip7iy.mongodb.net/awf_production?retryWrites=true&w=majority"
  )

  .then(() => console.log("Connection is successfull"))
  .catch((err) => `Connection is not successfully - ${err}`);
