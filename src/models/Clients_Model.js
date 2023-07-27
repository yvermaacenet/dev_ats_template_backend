const mongoose = require("mongoose");

const Client_Schema = mongoose.Schema({
  project_code: { type: String, uppercase: true },
  Description: { type: String, uppercase: true },
  client_name: { type: Object },
});

const Client_Model = new mongoose.model("clients_tbls", Client_Schema);

module.exports = Client_Model;
