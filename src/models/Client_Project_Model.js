const mongoose = require("mongoose");

const Client_Project_Schema = mongoose.Schema({
  project_code: { type: String, uppercase: true },
  Description: { type: String, uppercase: true },
  client_name: { type: Object },
});

const Client_Project_Model = new mongoose.model(
  "client_project_tbls",
  Client_Project_Schema
);

module.exports = Client_Project_Model;
