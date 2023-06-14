const mongoose = require("mongoose");

const On_Boarding_Schema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    unique: true,
    index: true,
  },
  hr: {
    onboard_meet_and_greet_welcome_call: {
      type: String,
      options: ["YES", "NO", "NA"],
    },
    verify_acenet_email_id_zoho_id_laptop_provision_to_employee: {
      type: String,
      options: ["YES", "NO", "NA"],
    },
    introduction_meeting_with_buddy: {
      type: String,
      options: ["YES", "NO", "NA"],
    },
    introduction_meeting_with_line_manager_respective_senior_manager: {
      type: String,
      options: ["YES", "NO", "NA"],
    },
    handover_to_project_complete: {
      type: String,
      options: ["YES", "NO", "NA"],
    },
    introduction_call_with_ceo: { type: String, options: ["YES", "NO", "NA"] },
    hr_on_boarding_status: { type: Boolean },
  },
  finance: {
    genrate_mail_id: { type: String, options: ["YES", "NO", "NA"] },
    one_drive_access: { type: String, options: ["YES", "NO", "NA"] },
    teams_access: { type: String, options: ["YES", "NO", "NA"] },
    add_to_official_dls: { type: String, options: ["YES", "NO", "NA"] },
    biometric: { type: String, options: ["YES", "NO", "NA"] },
    acenet_laptop: { type: String, options: ["YES", "NO", "NA"] },
    client_laptop: { type: String, options: ["YES", "NO", "NA"] },
    // notpad: { type: String, options: ["YES", "NO", "NA"] },
    t_shirt: { type: String, options: ["YES", "NO", "NA"] },
    welcome_kit: { type: String, options: ["YES", "NO", "NA"] },
    // intro_slide_shared: { type: String, options: ["YES", "NO", "NA"] },
    aadhar_card: { type: String, options: ["YES", "NO", "NA"] },
    pan_card: { type: String, options: ["YES", "NO", "NA"] },
    passport: { type: String, options: ["YES", "NO", "NA"] },
    dl: { type: String, options: ["YES", "NO", "NA"] },
    ten_th: { type: String, options: ["YES", "NO", "NA"] },
    tweleve_th: { type: String, options: ["YES", "NO", "NA"] },
    graduation: { type: String, options: ["YES", "NO", "NA"] },
    post_graduation: { type: String, options: ["YES", "NO", "NA"] },
    pay_slips: { type: String, options: ["YES", "NO", "NA"] },
    experience_proof: { type: String, options: ["YES", "NO", "NA"] },
    forms_16: { type: String, options: ["YES", "NO", "NA"] },
    passport_size_photo: { type: String, options: ["YES", "NO", "NA"] },
    signed_offer_latter: { type: String, options: ["YES", "NO", "NA"] },
    documents_verification: { type: String, options: ["YES", "NO", "NA"] },
    covid_certificate: { type: String, options: ["YES", "NO", "NA"] },
    employee_data_sheet_bank_details: {
      type: String,
      options: ["YES", "NO", "NA"],
    },
    other_official_documents: { type: String, options: ["YES", "NO", "NA"] },
    pf_form_recieved: { type: String, options: ["YES", "NO", "NA"] },
    pf_submitted_to_ca_team: { type: String, options: ["YES", "NO", "NA"] },
    PF_number_shared_with_the_employee: {
      type: String,
      options: ["YES", "NO", "NA"],
    },
    gratuity_Form_Received: { type: String, options: ["YES", "NO", "NA"] },
    gratuity_Form_submitteed_to_CA_Team: {
      type: String,
      options: ["YES", "NO", "NA"],
    },
    ghi_documents_received: { type: String, options: ["YES", "NO", "NA"] },
    ghi_initiated: { type: String, options: ["YES", "NO", "NA"] },
    ghi_eCard_issued: { type: String, options: ["YES", "NO", "NA"] },
    zoho_people_account_created: {
      type: String,
      options: ["YES", "NO", "NA"],
    },
    // zoho_people_account_activated: { type: String, options: ["YES", "NO", "NA"] },
    // zoho_payroll_integrated: { type: String, options: ["YES", "NO", "NA"] },
    bgv_initiated: { type: String, options: ["YES", "NO", "NA"] },
    bgv_invoice_Paid: { type: String, options: ["YES", "NO", "NA"] },
    bgv_report_Received: { type: String, options: ["YES", "NO", "NA"] },
    update_linkedIn: { type: String, options: ["YES", "NO", "NA"] },
    finance_on_boarding_status: { type: Boolean },
  },
  // wifi_passwords: { type: String, options: ["YES", "NO", "NA"] },

  // steper_counter: { type: Number },
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
});
const On_Boarding_Model = new mongoose.model(
  "on_boarding_tbl",
  On_Boarding_Schema
);

module.exports = On_Boarding_Model;
