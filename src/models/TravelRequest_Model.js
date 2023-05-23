const mongoose = require("mongoose");

const Travel_Request_Form_Schema = mongoose.Schema(
  {
    managers_approval: String,
    employee: {
      name: String,
      email: String,
      employee_id: String,
      phone: String,
      billable: String,
      project_id: String,
      reporting_manager: String,
    },
    travel: {
      start_date: Date,
      end_date: Date,
      // destination: Date,
      reason_for_travel: String,
    },
    flight: {
      flight_from_city: String,
      flight_to_city: String,
      flight_preferred_time: String,
      flight_class_preferred: String,
    },

    train: {
      train_from_city: String,
      train_to_city: String,
      train_preferred_time: String,
      train_class_preferred: String,
    },
    hotel: {
      hotel_city: String,
      hotel_checkin: Date,
      hotel_checkout: Date,
      hotel_number_of_rooms: Number,
    },
    other: {
      name_of_travel: String,
      from_location: String,
      to_location: String,
    },
  },
  { timestamps: true }
);

const Travel_Request_Form_Model = new mongoose.model(
  "travel_request_tbl",
  Travel_Request_Form_Schema
);

module.exports = Travel_Request_Form_Model;
