const Cabin_Slot_Booking_Model = require("../models/Cabin_Slot_Booking_Model");
const User_Model = require("../models/User_Model");
const Zoho_Model = require("../models/Zoho_Model");

exports.get_documents_counter = async (req, res) => {
  try {
    const Total_Users = await Zoho_Model.find().countDocuments();
    const Active_Users = await Zoho_Model.find({
      "Employee Status": "Active",
    }).countDocuments();

    const Deactive_Users = await Zoho_Model.find({
      $or: [
        {
          "Employee Status": "Deactive",
        },
        { "Employee Status": "" },
      ],
    }).countDocuments();
    const Pending_Onboarding = await Zoho_Model.find({
      $and: [
        {
          creation_date: { $gt: new Date(process.env.SPECIFIC_DATE) },
        },
        {
          on_boarding_status: false,
        },
      ],
    }).countDocuments();
    const Completed_Onboarding = await Zoho_Model.find({
      on_boarding_status: true,
    }).countDocuments();
    const Pending_Offboarding = await Zoho_Model.find({
      $and: [
        {
          off_boarding_steper_counter: { $gte: 1 },
        },

        {
          off_boarding_steper_counter: { $lte: 2 },
        },

        { off_boarding_status: false },
      ],
    }).countDocuments();
    const Completed_Offboarding = await Zoho_Model.find({
      off_boarding_status: true,
    }).countDocuments();
    const Total_Cabin_Booking =
      await Cabin_Slot_Booking_Model.find().countDocuments();
    const Total_Cabin_Booking_By_User_ID = await Cabin_Slot_Booking_Model.find({
      user_id: req.params.user_id,
    }).countDocuments();

    res.status(201).send({
      Total_Users,
      Active_Users,
      Deactive_Users,
      Pending_Onboarding,
      Completed_Onboarding,
      Pending_Offboarding,
      Completed_Offboarding,
      Total_Cabin_Booking,
      Total_Cabin_Booking_By_User_ID,
    });
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
