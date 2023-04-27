const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");
const Schema = mongoose.Schema;

// Define the schema
const flexiBenefitFormSchema = new Schema({
  name: String,
  email: String,
  emp_id: String,
  user_id: String,
  salary_band: String,
  stream: String,
  position: String,
  children_allowance: Number,
  telephone_allowance: String,
  fuel_allowance: String,
  driver_allowance: String,
  meals_allowance: String,
  books_and_periodicals_allowance: String,
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Boolean,
  },
});

// Create the model
const Flexible_Benefit = mongoose.model(
  "Flexible Benefit Form",
  flexiBenefitFormSchema
);

module.exports = Flexible_Benefit;
