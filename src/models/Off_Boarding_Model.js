const mongoose = require("mongoose");

const Off_Boarding_Schema = mongoose.Schema({
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    unique: true,
    index: true,
  },
  offboarding_hr: {
    acceptance_of_resignation_and_last_date_communication_to_employee: {
      type: Boolean,
    },
    appraisals_for_reportees: { type: Boolean },
    hr_off_boarding_status: { type: Boolean },
  },
  offboarding_finance: {
    informed_client_on_exit: { type: Boolean },
    project_official_duties_handover: { type: Boolean },
    important_mails_transferred: { type: Boolean },
    official_document_handover: { type: Boolean },
    acenet_laptop: { type: Boolean },
    id_card: { type: Boolean },
    // data_card_hotspot: { type: Boolean },
    client_asset: { type: Boolean },
    biometric_disabled: { type: Boolean },
    office_365_account_deletion: { type: Boolean },
    email_forwarded: { type: Boolean },
    zoho_account_deleted: { type: Boolean },
    relieving_letter_shared: { type: Boolean },
    fnf_statement_shared: { type: Boolean },
    fnf_cleared: { type: Boolean },
    employee_datasheet_updated: { type: Boolean },
    ghi_deletion: { type: Boolean },
    employee_folder_moved_to_past_employee_folder: { type: Boolean },
    ghi_opt_out: { type: Boolean },
    ghi_initiated: { type: Boolean },
    ghi_e_card_issued: { type: Boolean },
    finance_off_boarding_status: { type: Boolean },
  },
  offboarding_management: {
    handover_complete: { type: Boolean },
    eligible_for_rehire: { type: Boolean },
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
