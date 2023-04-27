const mongoose = require("mongoose");

const Off_Boarding_Schema = mongoose.Schema({
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    unique: true,
    index: true,
  },
  informed_client_on_exit: { type: Boolean },
  project_official_duties_handover: { type: Boolean },
  important_mails_transferred: { type: Boolean },
  official_document_handover: { type: Boolean },
  acenet_laptop: { type: Boolean },
  id_card: { type: Boolean },
  data_card_hotspot: { type: Boolean },
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
  ghi_initiated: { type: Boolean },
  ghi_e_card_issued: { type: Boolean },
  steper_counter: { type: Number },
  updated_by: [
    {
      type: {
        user_id: mongoose.Schema.Types.ObjectId,
        updated_data: { type: Object },
        updated_date: { type: Date, default: Date.now() },
      },
    },
  ],
  status: { type: Boolean },
  hr_off_boarding_status: { type: Boolean },
  finance_off_boarding_status: { type: Boolean },
  management_off_boarding_status: { type: Boolean },
});
const Off_Boarding_Model = new mongoose.model(
  "off_boarding_tbl",
  Off_Boarding_Schema
);

module.exports = Off_Boarding_Model;
