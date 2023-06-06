const mongoose = require("mongoose");

const Travel_Request_Form_Schema = mongoose.Schema(
  {
    // managers_approval: String,
    management_approval: String,
    remarks: String,
    employee: {
      name: String,
      email: String,
      user_id: String,
      employee_id: String,
      phone: String,
      billable: String,
      project_id: String,
      special_request: String,
      reason_for_travel: String,
    },
    travel_request: [
      {
        booking_for: Array,
        travel_type: String,
        travel_date: String,
        flight_from_city: String,
        flight_to_city: String,
        flight_preferred_time: String,
        accomendation_type: String,
        hotel_checkin_date: String,
        hotel_checkout_date: String,
      },
    ],
  },
  { timestamps: true }
);

const Travel_Request_Form_Model = new mongoose.model(
  "travel_request_tbl",
  Travel_Request_Form_Schema
);

module.exports = Travel_Request_Form_Model;
