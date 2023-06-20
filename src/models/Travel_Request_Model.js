const mongoose = require("mongoose");

const Travel_Request_Form_Schema = mongoose.Schema(
  {
    // managers_approval: String,
    management_approval: String,
    created_by: String,
    remarks: String,
    basicDetails: {
      billable: String,
      client_id: String,
      special_request: String,
      project_id: String,
      reason_for_travel: String,
    },

    rows: [
      {
        id: Number,
        data: {
          travel_mode: String,
          travel_from_city: { value: String, label: String },
          travel_to_city: { value: String, label: String },
          departure: Date,
          return: Date,
        },
      },
    ],
    travellersData: [
      {
        id: Number,
        data: {
          is_employee: String,
          emp_id: String,
          name: String,
          gender: String,
          phone: String,
          email: String,
          dob: Date,
        },
      },
    ],

    accommodationData: [
      {
        id: Number,
        data: {
          city: {
            value: String,
            label: String,
          },
          checkIn: Date,
          checkOut: Date,
          breakfastRequired: String,
          number_of_rooms: Number,
          number_of_adults: Number,
          number_of_children: Number,
        },
      },
    ],
    roomsData: [
      {
        id: Number,
        data: {
          emp_id: String,
          room: String,
          name: String,
          phone: String,
          email: String,
          dob: String,
        },
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
