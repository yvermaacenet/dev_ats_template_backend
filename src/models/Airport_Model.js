const mongoose = require("mongoose");

const Airport_Schema = mongoose.Schema({
  country_code: String,
  city_name: String,
  city_code: String,
  airport_name: String,
  airport_code: String,
});

const Airport_Model = new mongoose.model("airport_tbl", Airport_Schema);

module.exports = Airport_Model;
