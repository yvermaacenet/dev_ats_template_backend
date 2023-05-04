const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema
const taxFormSchema = new Schema({
  name: String,
  father_name: String,
  place: String,
  email: String,
  emp_id: String,
  user_id: String,
  address: String,
  designation: String,
  financial_year: String,
  permanent_account_number_of_the_employee: String,
  rent_paid_to_the_landlord: { type: String },
  name_of_the_landlord: { type: String },
  address_of_the_rental_property: { type: String },
  self_occupied_or_rented: { type: String },
  availed_in_last_4_years: { type: String },
  house_rent_allowance: { type: Boolean },
  leave_travel_concessions_or_assistance: { type: Boolean },
  deduction_of_interest_on_borrowing: { type: Boolean },
  permanent_account_number_of_the_landloard: { type: String },
  leave_travel_concessions_or_assistance_amount: { type: String },
  interest_payable_paid_to_the_lender: String,
  name_of_the_lender: String,
  address_of_the_lender: String,
  permanent_account_number_of_the_lender: String,
  financial_institutions: String,
  others: String,
  vpf_apply: String,
  deductions: [
    {
      section: String,
      section_type: String,
      section_amount: String,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Boolean,
  },
});

// Create the model
const TaxForm = mongoose.model("Form_12_BB", taxFormSchema);

module.exports = TaxForm;
