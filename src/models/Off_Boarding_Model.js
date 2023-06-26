const mongoose = require("mongoose");

const Off_Boarding_Schema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    unique: true,
    index: true,
  },
  offboarding_hr: {
    acceptance_of_resignation_and_last_date_communication_to_employee: {
      type: String,
      options: ["YES", "NO", "NA"],
    },
    appraisals_for_reportees: {
      type: String,
      options: ["YES", "NO", "NA"],
    },
    hr_off_boarding_status: { type: Boolean },
  },
  offboarding_finance: {
    informed_client_on_exit: {
      type: String,
      options: ["YES", "NO", "NA"],
    },
    project_official_duties_handover: {
      type: String,
      options: ["YES", "NO", "NA"],
    },
    important_mails_transferred: {
      type: String,
      options: ["YES", "NO", "NA"],
    },
    official_document_handover: {
      type: String,
      options: ["YES", "NO", "NA"],
    },
    acenet_laptop: {
      type: String,
      options: ["YES", "NO", "NA"],
    },
    id_card: {
      type: String,
      options: ["YES", "NO", "NA"],
    },

    client_asset: {
      type: String,
      options: ["YES", "NO", "NA"],
    },
    biometric_disabled: {
      type: String,
      options: ["YES", "NO", "NA"],
    },
    office_365_account_deletion: {
      type: String,
      options: ["YES", "NO", "NA"],
    },
    email_forwarded: {
      type: String,
      options: ["YES", "NO", "NA"],
    },
    zoho_account_deleted: {
      type: String,
      options: ["YES", "NO", "NA"],
    },
    relieving_letter_shared: {
      type: String,
      options: ["YES", "NO", "NA"],
    },
    fnf_statement_shared: {
      type: String,
      options: ["YES", "NO", "NA"],
    },
    fnf_cleared: {
      type: String,
      options: ["YES", "NO", "NA"],
    },
    employee_datasheet_updated: {
      type: String,
      options: ["YES", "NO", "NA"],
    },
    ghi_deletion: {
      type: String,
      options: ["YES", "NO", "NA"],
    },
    employee_folder_moved_to_past_employee_folder: {
      type: String,
      options: ["YES", "NO", "NA"],
    },
    ghi_opt_out: {
      type: String,
      options: ["YES", "NO", "NA"],
    },
    ghi_initiated: {
      type: String,
      options: ["YES", "NO", "NA"],
    },
    ghi_e_card_issued: {
      type: String,
      options: ["YES", "NO", "NA"],
    },
    finance_off_boarding_status: { type: Boolean },
  },
  offboarding_management: {
    handover_complete: {
      type: String,
      options: ["YES", "NO", "NA"],
    },
    eligible_for_rehire: {
      type: String,
      options: ["YES", "NO", "NA"],
    },
    management_off_boarding_status: { type: Boolean },
  },

  updated_by: [
    {
      type: {
        user_id: mongoose.Schema.Types.ObjectId,
        user_name: { type: String },
        updated_data: { type: Object },
        updated_date: { type: Date, default: Date.now() },
      },
    },
  ],
  // status: { type: Boolean },
  // steper_counter: { type: Number },
});
const Off_Boarding_Model = new mongoose.model(
  "off_boarding_tbl",
  Off_Boarding_Schema
);

module.exports = Off_Boarding_Model;
