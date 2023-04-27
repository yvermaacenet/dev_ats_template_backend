const mongoose = require("mongoose");

const Cabin_Slot_Booking_Schema = mongoose.Schema({
  start: { type: Date },
  end: { type: Date },
  title: { type: String },
  allDay: { type: Boolean },
  cabin_id: { type: String },
  user_id: { type: String },
  description: { type: String },
  location: { type: String },
  creation_date: {
    type: Date,
    default: Date.now,
  },
});

const Cabin_Slot_Booking_Model = new mongoose.model(
  "user_cabin_slot_booking_tbl",
  Cabin_Slot_Booking_Schema
);

module.exports = Cabin_Slot_Booking_Model;
