const mongoose = require("mongoose");

const Travel_Request_Form_Schema = mongoose.Schema(
  {
    name: String,
    email: String,
    phone: Number,
    travel_start_date: Date,
    travel_end_date: Date,
    project_id: String,
    billable: String,
    reason_for_travel: String,
    travel_flight: {
      flight_from_city: String,
      flight_to_city: String,
      flight_preferred_time: Date,
      flight_class_preferred: String,
    },
    travel_train: {
      train_from_city: String,
      train_to_city: String,
      train_preferred_time: Date,
      train_class_preferred: String,
    },
    travel_hotel: {
      hotel_city: String,
      hotel_checkin: Date,
      hotel_checkout: Date,
      hotel_number_of_rooms: Number,
    },
    travel_other: {
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
