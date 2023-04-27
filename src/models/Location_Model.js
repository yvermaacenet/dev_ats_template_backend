const mongoose = require("mongoose");

const Location_Schema = mongoose.Schema({
  name: { type: String, uppercase: true },
});

const Location_Model = new mongoose.model("Location", Location_Schema);

module.exports = Location_Model;
