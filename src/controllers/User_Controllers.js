// const bcrypt = require("bcrypt");
// const User_Model = require("../models/User_Model");
// const { generateUsername } = require("unique-username-generator");
// const Cabin_Slot_Booking_Model = require("../models/Cabin_Slot_Booking_Model");
// const Cabin_Model = require("../models/Cabin_Model");
// const Department_Model = require("../models/Department_Models");
const On_Boarding_Model = require("../models/On_Boarding_Model");
const Zoho_Model = require("../models/Zoho_Model");
// const { default: axios } = require("axios");

// <!=============== signup ====================>
// exports.sign_up = async (req, res) => {
//   try {
//     const getUserCount = await User_Model.find().countDocuments();
//     const username = "Acenet" + generateUsername("", 0, 4);
//     const generateCompanyEmail = req.body.f_name + "@acenet.io";
//     const role = { value: 2, name: "Employee" };
//     response = {
//       ...req.body,
//       username,
//       status: true,
//       user_emp_id: getUserCount,
//       company_email: generateCompanyEmail,
//       role,
//       on_boarding_steper_counter: 0,
//       off_boarding_steper_counter: 0,
//       on_boarding_status: false,
//       off_boarding_status: false,
//     };
//     await User_Model.create(response);
//     res.status(201).send({
//       message: "Registered successfully",
//     });
//   } catch (error) {
//     res.status(400).send({
//       message: "Not registered",
//     });
//   }
//   // res.status(201).send(aa);
// };
// <!=============== signin ====================>
// exports.sign_in = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const userDetails = await User_Model.findOne({
//       $and: [{ username }, { status: true }],
//     });
//     if (userDetails === null) {
//       res.send("Account is deactive");
//     } else {
//       // console.log("userDetails", userDetails);
//       const isMatch = await bcrypt.compare(password, userDetails.password);
//       if (isMatch) {
//         const token = await User_Model.generateAuthToken(
//           userDetails._id.toString()
//         );
//         // console.log("token", token);
//         const cookie = await User_Model.generateCookie(req, res, token);
//         // console.log("cookie", cookie);

//         const updateDetails = await User_Model.updateData(
//           userDetails._id.toString(),
//           {
//             token,
//           }
//         );
//         // console.log("updateDetails", updateDetails);

//         res.status(201).send({
//           name: updateDetails?.f_name,
//           message: "loggedin successfully.",
//           user_id: updateDetails?._id,
//           role: updateDetails?.role,
//           // access_token: updateDetails?.token,
//         });
//       } else res.send("Invalid login details");
//     }
//   } catch (error) {
//     res.clearCookie("myCookie");
//     res.status(400).send("Invalid Credential");
//   }
//   // res.status(201).send(userDetails);
// };
// exports.sign_in = async (req, res) => {
//   console.log(req.body);
//   try {
//     const { username, password } = req.body;
//     const userDetails = await Zoho_Model.findOne({
//       "Email address": username,
//     });
//     // if (userDetails === null) {
//     //   res.send("Account is deactive");
//     // } else {
//     // console.log("userDetails", userDetails);
//     const isMatch = await bcrypt.compare(password, userDetails.password);
//     if (isMatch) {
//       const token = await User_Model.generateAuthToken(
//         userDetails._id.toString()
//       );
//       console.log("token", token);
//       const cookie = await User_Model.generateCookie(req, res, token);
//       // console.log("cookie", cookie);

//       // const updateDetails = await Zoho_Model.updateData(
//       //   userDetails._id.toString(),
//       //   {
//       //     token,
//       //   }
//       // );
//       // console.log("updateDetails", updateDetails);

//       res.status(201).send({
//         name: userDetails["First Name"],
//         email: userDetails["Email address"],
//         message: "loggedin successfully",
//         user_id: userDetails?._id,
//         emp_id: userDetails?.["Employee ID"],
//         role: [{ value: 2, name: "Employee" }],
//         department: userDetails?.Department,
//         // access_token: updateDetails?.token,
//       });
//     } else res.send("Invalid login details");
//     // }
//   } catch (error) {
//     res.clearCookie("myCookie");
//     res.status(400).send({ message: "Invalid Credential" });
//   }
//   // res.status(201).send(userDetails);
// };
// <!=============== User ====================>
exports.user_update = async (req, res) => {
  const { _id } = req.params;
  // console.log(req.body.role);
  // const token = await Admin_Model.generateAuthToken(verifiedToken._id);
  // const cookie = await Admin_Model.generateCookie(req, res, token);
  // await Admin_Model.updateData(verifiedToken._id, {
  //   token,
  // });
  // <!================  Update User   =============>
  await Zoho_Model.findByIdAndUpdate(
    { _id },
    {
      $set: { ...req.body },
    },
    { new: true }
  );
  res.status(201).send({ message: "updated" });
};
// exports.user_activation = async (req, res) => {
//   const { _id, status } = req.params;
//   // const token = await Admin_Model.generateAuthToken(verifiedToken._id);
//   // const cookie = await Admin_Model.generateCookie(req, res, token);
//   // await Admin_Model.updateData(verifiedToken._id, {
//   //   token,
//   // });

//   // <!================  Update User Status Active/Deactive  =============>
//   await User_Model.findByIdAndUpdate(
//     { _id },
//     {
//       $set: { status },
//     },
//     { new: true }
//   );
//   res.status(201).send(status);
// };
exports.get_user_list_by_status_code = async (req, res) => {
  const status_code = req.params.status_code;
  // console.log(status_code);
  try {
    const active_user_list = await Zoho_Model.find({
      "Employee Status": "Active",
    }).select({
      token: 0,
    });

    const deactive_user_list = await Zoho_Model.find({
      $or: [
        {
          "Employee Status": "Deactive",
        },
        { "Employee Status": "" },
      ],
    }).select({
      token: 0,
    });
    const pending_onboarding_users_list = await Zoho_Model.find({
      $and: [
        {
          creation_date: { $gte: new Date(process.env.SPECIFIC_DATE) },
        },
        {
          on_boarding_status: false,
        },
      ],
    }).select({
      token: 0,
    });
    const pending_offboarding_users_list = await Zoho_Model.find({
      $and: [
        { initiate_off_boarding_status: true },
        { off_boarding_status: false },
      ],
    }).select({
      token: 0,
    });
    if (req.params.status_code === "active_users") {
      res.status(201).send(active_user_list);
    } else if (req.params.status_code === "deactive_users") {
      res.status(201).send(deactive_user_list);
    } else if (req.params.status_code === "pending_onboarding_users") {
      res.status(201).send(pending_onboarding_users_list);
    } else if (req.params.status_code === "pending_offboarding_users") {
      res.status(201).send(pending_offboarding_users_list);
    } else {
      res.status(201).send(active_user_list);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
// exports.get_user_list_by_on_boarding_counter_by_status_code = async (
//   req,
//   res
// ) => {
//   // console.log("req.params.steper_counter", req.params.steper_counter);
//   // const token = await Admin_Model.generateAuthToken(verifiedToken._id);
//   // const cookie = await Admin_Model.generateCookie(req, res, token);
//   // await Admin_Model.updateData(verifiedToken._id, {
//   //   token,
//   // });

//   const all_user_list = await User_Model.find({
//     $or: [{ on_boarding_steper_counter: { $gte: req.params.steper_counter } }],
//   }).select({ token: 0 });
//   const active_user_list = await User_Model.find({
//     $or: [{ on_boarding_steper_counter: { $gte: req.params.steper_counter } }],
//     status: true,
//   }).select({
//     token: 0,
//   });
//   const deactive_user_list = await User_Model.find({
//     $or: [{ on_boarding_steper_counter: { $gte: req.params.steper_counter } }],
//     status: false,
//   }).select({
//     token: 0,
//   });
//   if (req.params.status_code === "active_users") {
//     res.status(201).send(active_user_list);
//   } else if (req.params.status_code === "deactive_users") {
//     res.status(201).send(deactive_user_list);
//   } else {
//     res.status(201).send(all_user_list);
//   }
// };
// exports.get_user_list_by_off_boarding_counter = async (req, res) => {
//   // console.log("req.params.steper_counter", req.params.steper_counter);
//   // const token = await Admin_Model.generateAuthToken(verifiedToken._id);
//   // const cookie = await Admin_Model.generateCookie(req, res, token);
//   // await Admin_Model.updateData(verifiedToken._id, {
//   //   token,
//   // });
//   const user_list = await User_Model.find({
//     $or: [{ off_boarding_steper_counter: { $gte: req.params.steper_counter } }],
//   }).select({ token: 0 });
//   res.status(201).send(user_list);
// };
exports.get_user_list_By_Id = async (req, res) => {
  // console.log(req.params._id);
  const _id = req.params._id;
  const user_list = await Zoho_Model.findById({ _id });
  res.status(201).send(user_list);
};
exports.get_user_list_By_Role_Name = async (req, res) => {
  try {
    const user_details_admin = await Zoho_Model.find({
      "Acenet Role": { $in: ["Admin"] },
    }).select({
      _id: 1,
    });
    const user_details_hr = await Zoho_Model.find({
      "Acenet Role": { $in: ["Hr"] },
    }).select({
      _id: 1,
    });
    const user_details_finance = await Zoho_Model.find({
      "Acenet Role": { $in: ["Finance"] },
    }).select({
      _id: 1,
    });
    const user_details_management = await Zoho_Model.find({
      "Acenet Role": { $in: ["Management"] },
    }).select({
      _id: 1,
    });
    const user_details_reporting_manager = await Zoho_Model.distinct(
      "Reporting Manager"
    );
    const res1 = user_details_reporting_manager?.map((x) => x.slice(-2));
    const stringArrayForAdmin = [];
    const stringArrayForHR = [];
    const stringArrayForFinance = [];
    const stringArrayForManagement = [];
    await user_details_admin.map((val) => stringArrayForAdmin.push(val._id));
    await user_details_hr.map((val) => stringArrayForHR.push(val._id));
    await user_details_finance.map((val) =>
      stringArrayForFinance.push(val._id)
    );
    await user_details_management.map((val) =>
      stringArrayForManagement.push(val._id)
    );
    res.status(201).send({
      Admin: stringArrayForAdmin,
      Hr: stringArrayForHR,
      Finance: stringArrayForFinance,
      Management: stringArrayForManagement,
      Reporting_Manager: res1,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
// <!=============== Upload Users By File   ====================>
// exports.users_upload_by_file = async (req, res) => {
//   const data = req.body;
//   const finalData = [];
//   const username = "Acenet" + generateUsername("", 0, 4);
//   let getUserCount = await User_Model.find().countDocuments();
//   for (let i = 0; i < data.length; i++) {
//     data[i].username = "Acenet" + generateUsername("", 0, 4);

//     data[i].user_emp_id = getUserCount += 1;
//   }
//   // console.log(data)
//   const personal_email = data.map(({ personal_email }) => personal_email);
//   const phone = data.map(({ phone }) => phone);
//   const company_email = data.map(({ company_email }) => company_email);
//   const existingUsers = await User_Model.find({
//     $or: [
//       {
//         personal_email: {
//           $in: data.map(({ personal_email }) => personal_email),
//         },
//       },

//       { phone: { $in: data.map(({ phone }) => phone) } },

//       {
//         company_email: { $in: data.map(({ company_email }) => company_email) },
//       },
//     ],
//   });
//   // console.log(existingUsers);
//   if (existingUsers.length > 0) {
//     // console.log("Found duplicates:", existingUsers);
//     res.status(500).json({ duplicates: existingUsers });

//     // Handle the duplicate records here, e.g. return an error response
//   } else {
//     // Insert the new records into the database here

//     User_Model.insertMany(data);

//     res.json({ message: "uploaded" });
//   }
// };
// <!=============== Cabin Slot Booking ====================>

// exports.post_cabin_slot_booking = async (req, res) => {
//   console.log("req.body", req.body);
//   // const token = await User_Model.generateAuthToken(verifiedToken._id);
//   // const cookie = await User_Model.generateCookie(req, res, token);
//   // const updateDetails = await User_Model.updateData(verifiedToken._id, {
//   //   token,
//   // });
//   await Cabin_Slot_Booking_Model.create(req.body);
//   res.status(201).send("created");
// };
// exports.get_all_cabin_slot_booking = async (req, res) => {
//   // const token = await User_Model.generateAuthToken(verifiedToken._id);
//   // const cookie = await User_Model.generateCookie(req, res, token);
//   // const updateDetails = await User_Model.updateData(verifiedToken._id, {
//   //   token,
//   // });
//   const result = await Cabin_Slot_Booking_Model.find();
//   res.status(201).send(result);
// };
// exports.get_cabin_slot_booking = async (req, res) => {
//   // const token = await User_Model.generateAuthToken(verifiedToken._id);
//   // const cookie = await User_Model.generateCookie(req, res, token);
//   // const updateDetails = await User_Model.updateData(verifiedToken._id, {
//   //   token,
//   // });
//   const getCableTblsData = await Cabin_Model.find({ status: true });
//   // console.log("getCableTblsData", getCableTblsData);
//   const allresult = await Cabin_Slot_Booking_Model.find({
//     cabin_id: getCableTblsData.map((val) => val._id),
//   });
//   const result = await Cabin_Slot_Booking_Model.find({
//     cabin_id: req.params._id,
//   });

//   if (req.params._id === "all") {
//     res.status(201).send(allresult);
//     // console.log(allresult);
//   } else {
//     res.status(201).send(result);
//     // console.log("result", result);
//   }
// };
// exports.update_cabin_slot_booking = async (req, res) => {
//   // const token = await User_Model.generateAuthToken(verifiedToken._id);
//   // const cookie = await User_Model.generateCookie(req, res, token);
//   // const updateDetails = await User_Model.updateData(verifiedToken._id, {
//   //   token,
//   // });
//   await Cabin_Slot_Booking_Model.findByIdAndUpdate(
//     { _id: req.params._id },
//     { $set: req.body }
//   );
//   res.status(201).send("updated");
// };
// exports.delete_cabin_slot_booking = async (req, res) => {
//   // const token = await User_Model.generateAuthToken(verifiedToken._id);
//   // const cookie = await User_Model.generateCookie(req, res, token);
//   // const updateDetails = await User_Model.updateData(verifiedToken._id, {
//   //   token,
//   // });
//   await Cabin_Slot_Booking_Model.findByIdAndDelete({ _id: req.params._id });
//   res.status(201).send("removed");
// };

// <!=============== Department ====================>

// exports.post_department_list = async (req, res) => {
//   // const token = await Admin_Model.generateAuthToken(verifiedToken._id);
//   // const cookie = await Admin_Model.generateCookie(req, res, token);
//   // await Admin_Model.updateData(verifiedToken._id, {
//   //   token,
//   // });
//   const department_list_count = await Department_Model.find().countDocuments();
//   await Department_Model.create({
//     ...req.body,
//     value: department_list_count,
//   });
//   res.status(201).send({ message: "created" });
// };

// exports.get_department_list = async (req, res) => {
//   // const token = await Admin_Model.generateAuthToken(verifiedToken._id);
//   // const cookie = await Admin_Model.generateCookie(req, res, token);
//   // await Admin_Model.updateData(verifiedToken._id, {
//   //   token,
//   // });
//   const user_department = await Department_Model.find();
//   res.status(201).send(user_department);
// };

// exports.update_department_list = async (req, res) => {
//   // const token = await Admin_Model.generateAuthToken(verifiedToken._id);
//   // const cookie = await Admin_Model.generateCookie(req, res, token);
//   // await Admin_Model.updateData(verifiedToken._id, {
//   //   token,
//   // });
//   await Department_Model.findByIdAndUpdate(
//     { _id: req.params._id },
//     { $set: req.body }
//   );
//   res.status(201).send({ message: "updated" });
// };
// exports.get_department_list_by_id = async (req, res) => {
//   // const token = await Admin_Model.generateAuthToken(verifiedToken._id);
//   // const cookie = await Admin_Model.generateCookie(req, res, token);
//   // await Admin_Model.updateData(verifiedToken._id, {
//   //   token,
//   // });
//   const Department_list_data = await Department_Model.findById({
//     _id: req.params._id,
//   });
//   res.status(201).send(Department_list_data);
// };
// <!=============== wellcome ====================>

// exports.wellcome = async (req, res) => {
//   const token = await User_Model.generateAuthToken(verifiedToken._id);
//   const cookie = await User_Model.generateCookie(req, res, token);
//   const updateDetails = await User_Model.updateData(verifiedToken._id, {
//     token,
//   });
//   res.status(201).send(updateDetails);
// };
// <!=============== Update ====================>

// exports.update = async (req, res) => {
//   const token = await User_Model.generateAuthToken(verifiedToken._id);
//   const cookie = await User_Model.generateCookie(req, res, token);
//   const obj = {
//     ...req.body,
//     token,
//   };
//   const updateDetails = await User_Model.updateData(verifiedToken._id, obj);
//   res.status(201).send(updateDetails);
// };
// exports.sign_in_zoho = async (req, res) => {
//   const authUrl = `https://accounts.zoho.in/oauth/v2/auth?scope=ZohoPeople.employee.ALL,ZohoPeople.forms.ALL&client_id=1000.5T8DM01JDTNRYUPXI0I96CA5WD7YTY&response_type=code&access_type=offline&redirect_uri=http://localhost:3000/dashboard`;
//   const response = await axios.get(authUrl);
//   // Redirect the user to the Zoho login page
//   res.send(response?.request?._redirectable?._currentUrl);
// };
// exports.get_zoho_data = async (req, res) => {
//   try {
//     const userDetails = await Zoho_Model.find();
//     res.status(200).send(userDetails);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };
// exports.sign_in_zoho_get_access_token = async (req, res) => {
//   const code = req.params.code;
//   if (code) {
//     const authUrl = `https://accounts.zoho.in/oauth/v2/token?grant_type=authorization_code&client_id=1000.5T8DM01JDTNRYUPXI0I96CA5WD7YTY&client_secret=9a85b7eca3f270d6427e4e72005bb3eb2ee6076d06&redirect_uri=http://localhost:3000/dashboard&code=${code}`;
//     const response = await axios.post(authUrl);
//     if (response?.data?.access_token) {
//       const record = await axios.get(
//         "https://people.zoho.in/people/api/forms/P_EmployeeView/records",
//         {
//           headers: {
//             Authorization: `Zoho-oauthtoken ${response?.data.access_token}`,
//           },
//         }
//       );
//       const updated = await record.data.map((val) => {
//         val.password = generateUsername("", 1, 6);
//         return val;
//       });
//       console.log("record", updated);

//       await Zoho_Model.insertMany(updated);
//     }
//   }

//   // console.log(code);
//   // console.log(response);
//   // console.log(record);
//   // Redirect the user to the Zoho login page
//   res.send("code");
// };
// exports.get_users = async (req, res) => {
//   // await Zoho_Model.findByIdAndUpdate(
//   //   { _id },
//   //   {
//   //     $set: { ...req.body },
//   //   },
//   //   { new: true }
//   // );
//   const dd = await Zoho_Model.find();
//   const ff = await On_Boarding_Model.find();
//   const res2 = db.createView("Zoho_Model", [
//     {
//       $lookup: {
//         from: "On_Boarding_Model",
//         localField: "_id",
//         foreignField: "user_id",
//         as: "inventoryDocs",
//       },
//     },
//   ]);
//   res.status(201).send(res2);
// };
