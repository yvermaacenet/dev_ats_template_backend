const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");
const Schema = mongoose.Schema;

// Define the schema
const Form_Flexi_Benefit_Form_Schema = new Schema({
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
const Form_Flexi_Benefit_Form_Model = mongoose.model(
  "form_flexible_benefit_form_tbl",
  Form_Flexi_Benefit_Form_Schema
);

module.exports = Form_Flexi_Benefit_Form_Model;
