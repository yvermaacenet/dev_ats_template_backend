const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost:27017/ats_template")
  // .connect(
  //   "mongodb+srv://acenet:acenet@cluster0.yxz5opb.mongodb.net/acenetats?retryWrites=true&w=majority"
  // )
  .then(() => console.log("Connection is successfull"))
  .catch((err) => `Connection is not successfully - ${err}`);
