const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User_Schema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  company_email: {
    type: String,
    unique: true,
  },
  user_emp_id: {
    type: Number,
    unique: true,
  },
  role: [{ type: { value: Number, name: String } }],
  status: {
    type: Boolean,
  },
  f_name: {
    type: String,
  },
  m_name: {
    type: String,
  },
  l_name: {
    type: String,
  },
  father_name: {
    type: String,
  },
  dob: {
    type: Date,

    default: Date.now,
  },
  joining_date: {
    type: Date,
  },
  designation: {
    type: String,
  },
  base_location: {
    type: String,
  },
  base_location_oth: {
    type: String,
  },
  permanent_address: {
    type: String,
  },
  communication_address: {
    type: String,
  },
  personal_email: {
    type: String,
    unique: true,
  },
  emergency_contact_person_name: {
    type: String,
  },
  emergency_contact_person_relationship: {
    type: String,
  },
  emergency_contact_person_phone: { type: Number, require: true },
  blood_group: {
    type: String,
  },
  medical_history: {
    type: Number,
  },
  group_health_insurance: {
    type: Number,
  },
  v_p_f: {
    type: Number,
  },
  legal_history: {
    type: String,
  },
  passport_number: {
    type: Number,
  },
  passport_validity: {
    type: Date,
  },
  aadhar_number: {
    type: Number,
  },
  pan_number: {
    type: String,
  },
  highest_education: {
    type: Number,
  },
  bank_name: {
    type: String,
  },
  name_in_bank_account: {
    type: String,
  },
  bank_account_number: {
    type: String,
  },
  bank_ifsc_code: {
    type: String,
  },
  bank_branch_name: {
    type: String,
  },
  covid_vaccination: {
    type: Number,
  },
  vaccination_certificate_provided: {
    type: Number,
  },
  t_shirt_size: {
    type: String,
  },
  add_company_linkedIn: {
    type: Number,
  },
  about: {
    type: String,
  },
  phone: {
    type: String,
    require: true,
    lowercase: true,
    trim: true,
    unique: [true, "Phone no is already registerd"],
    validate(value) {
      if (!validator.isNumeric(value)) {
        throw new Error("Phone no is inValid");
      }
    },
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
  on_boarding_steper_counter: { type: Number },
  on_boarding_status: { type: Boolean },
  off_boarding_steper_counter: { type: Number },
  off_boarding_status: { type: Boolean },
  token: { type: String },
});

User_Schema.statics.generateAuthToken = async function (_id) {
  try {
    const token = await jwt.sign({ _id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    return token;
  } catch (error) {
    res.send(error);
  }
};

User_Schema.statics.generateCookie = async function (req, res, token) {
  try {
    const cookieOptions = {
      sameSite: "strict",
      path: "/",
      expires: new Date(Date.now() + 3600000),
      httpOnly: false,
      secure: true,
    };
    const cookie = res.cookie("Access_Token", token, cookieOptions).status(202);
    return cookie;
  } catch (err) {
    res.send(err);
  }
};

User_Schema.statics.updateData = async function (_id, obj) {
  const updatedData = await User_Model.findByIdAndUpdate(
    { _id },
    { $set: obj },
    { new: true }
  );
  return updatedData;
};

User_Schema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User_Model = new mongoose.model("users_tbl", User_Schema);

module.exports = User_Model;
