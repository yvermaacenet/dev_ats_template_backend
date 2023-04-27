const mongoose = require("mongoose");

const Cabin_Schema = mongoose.Schema({
  name: { type: String, uppercase: true },
  location: { type: String, uppercase: true },
  color_code: { type: Object },
  status: { type: Boolean },
});

const Cabin_Model = new mongoose.model("cabin_tbl", Cabin_Schema);

module.exports = Cabin_Model;
