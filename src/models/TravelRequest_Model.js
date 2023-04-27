const mongoose = require("mongoose");

const Travel_Request_Form_Schema = mongoose.Schema({
  name: String,
  email: String,
  from_location: String,
  destination: String,
  start_date: Date,
  end_date: Date,
  billable: String,
  reason_for_travel: String,
  type_of_request: String,
  reporting_manager: String,
  remarks: String,
  comments: String,
  estimated_amount: Number,
  creation_date: {
    type: Date,
    default: Date.now,
  },
  status: String,
  manager_status: String,
  management_status: String,
});

const Travel_Request_Form_Model = new mongoose.model(
  "travel_request",
  Travel_Request_Form_Schema
);

module.exports = Travel_Request_Form_Model;
