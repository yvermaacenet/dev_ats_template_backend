const mongoose = require("mongoose");

const Travel_Request_Form_Schema = mongoose.Schema(
  {
    managers_approval: String,
    reporting_manager: String,
    remarks: String,
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
      reason_for_travel: String,
    },
    flight: {
      flight_travel: Boolean,
      flight_from_city: String,
      flight_to_city: String,
      flight_preferred_time: String,
      flight_class_preferred: String,
    },
    train: {
      train_travel: Boolean,
      train_from_city: String,
      train_to_city: String,
      train_preferred_time: String,
      train_class_preferred: String,
    },
    hotel: {
      hotel_travel: Boolean,
      hotel_city: String,
      hotel_checkin: Date,
      hotel_checkout: Date,
      hotel_number_of_rooms: Number,
    },
    other: {
      other_travel: Boolean,
      other_travel_type: String,
      other_from_city: String,
      other_to_city: String,
    },
  },
  { timestamps: true }
);

const Travel_Request_Form_Model = new mongoose.model(
  "travel_request_tbl",
  Travel_Request_Form_Schema
);

module.exports = Travel_Request_Form_Model;
