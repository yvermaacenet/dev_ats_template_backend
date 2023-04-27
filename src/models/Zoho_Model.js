const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Zoho_Employee_Schema = new mongoose.Schema({
  "Work Phone Number": String,
  modifiedTime: String,
  "Email address": {
    type: String,
    unique: true,
  },
  "First Name": String,
  "Employee ID": {
    type: Number,
    unique: true,
  },
  Photo: String,
  "Added By": String,
  "Source of Hire": String,
  ApprovalStatus: String,
  recordId: String,
  "Modified By": String,
  Department: String,
  "Seating Location": String,
  ownerName: String,
  "Nick Name": String,
  "Employment Type": String,
  "About Me": String,
  "Date of Birth": String,
  "Last Name": String,
  Location: String,
  "Zoho Role": String,
  // role: [{ type: { value: Number, name: String } }],
  // password: {
  //   type: String,
  //   trim: true,
  // },
  "Added Time": String,
  createdTime: String,
  "Acenet Role": String,
  Tags: String,
  Photo_downloadUrl: String,
  Designation: String,
  "Ask me about/Expertise": String,
  "Employee Status": String,
  "Personal Mobile Number": String,
  ownerID: String,
  "Marital Status": String,
  "Personal Email Address": String,
  "Modified Time": String,
  "Date of Joining": String,
  Extension: String,
  "Reporting Manager": String,
  // on_boarding_steper_counter: { type: Number },
  on_boarding_status: { type: Boolean },
  initiate_on_boarding_status: { type: Boolean },
  initiate_off_boarding_status: { type: Boolean },
  // off_boarding_steper_counter: { type: Number },
  off_boarding_status: { type: Boolean },
  creation_date: {
    type: Date,
    default: "2023-04-16T12:00:00.179+00:00",
  },
});
// <!=============== Generate Token ====================>

Zoho_Employee_Schema.statics.generateAuthToken = async function (_id) {
  try {
    const generate_auth_token = await jwt.sign(
      { _id },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    return generate_auth_token;
  } catch (error) {
    res.send(error);
  }
};
// <!=============== Generate Cookies ====================>

Zoho_Employee_Schema.statics.generateCookie = async function (req, res, token) {
  // console.log("req", req);
  // console.log("res", res);
  // console.log("token", token);
  try {
    const cookieOptions = {
      sameSite: "strict",
      path: "/",
      expires: new Date(Date.now() + 3600000), // Set expiration time to 1 hour from now
      httpOnly: false,
      secure: false,
    };
    const cookie = res.cookie("Access_Token", token, cookieOptions).status(201);
    // console.log("cookie", cookie);
    return cookie;
  } catch (err) {
    res.send(err);
  }
};
// <!=============== Create Hash Password ====================>

Zoho_Employee_Schema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
// <!=============== Admin Model ====================>

const Zoho_Model = new mongoose.model(
  "Zoho_Employee_tbl",
  Zoho_Employee_Schema
);

module.exports = Zoho_Model;
// module.exports = mongoose.model("ZohoEmployee", Zoho_Employee_Schema);
