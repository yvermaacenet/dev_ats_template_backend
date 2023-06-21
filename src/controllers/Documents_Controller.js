const Cabin_Slot_Booking_Model = require("../models/Cabin_Slot_Booking_Model");
const Travel_Request_Form_Model = require("../models/Travel_Request_Model");
const User_Model = require("../models/User_Model");
const Zoho_Model = require("../models/Zoho_Model");

exports.get_documents_counter = async (req, res) => {
  try {
    const Active_Users = await Zoho_Model.find({
      $or: [
        {
          $and: [
            {
              creation_date: { $lte: new Date(process.env.SPECIFIC_DATE) },
            },
            {
              initiate_on_boarding_status: false,
            },
            {
              "First Name": { $nin: ["accounts", "System"] },
            },
          ],
        },
        {
          on_boarding_status: true,
        },
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

    const Pending_Offboarding = await Zoho_Model.find({
      $and: [
        // { on_boarding_status: true },
        {
          initiate_off_boarding_status: true,
        },
        { off_boarding_status: false },
      ],
    }).countDocuments();

    const Total_Cabin_Booking =
      await Cabin_Slot_Booking_Model.find().countDocuments();
    const Total_Cabin_Booking_By_User_ID = await Cabin_Slot_Booking_Model.find({
      user_id: req.params.user_id,
    }).countDocuments();
    const Travel_Request_By_User_ID = await Travel_Request_Form_Model.find({
      "employee.user_id": req.params.user_id,
    }).countDocuments();
    const Travel_Request_For_Approval_and_Decline =
      req?.params?.acenet_role === "Management"
        ? await Travel_Request_Form_Model.find().countDocuments({
            $and: [
              { management_approval: "Pending" },
              { created_by: { $nin: req?.params?.email } },
            ],
          })
        : await Travel_Request_Form_Model.find({
            "employee.reporting_manager_emp_id":
              req.params.reporting_manager_emp_id,
          }).countDocuments();
    res.status(201).send({
      Active_Users,
      Pending_Onboarding,
      Pending_Offboarding,
      Travel_Request_By_User_ID,
      Travel_Request_For_Approval_and_Decline,
    });
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
exports.get_notifications_counter = async (req, res) => {
  try {
    if (req?.params?.acenet_role === "Management") {
      const Total_Notification = await Travel_Request_Form_Model.find({
        management_approval: "Pending",
      }).countDocuments();
      res.status(201).send({
        Total_Notification,
      });
    } else {
      const Total_Notification1 = await Travel_Request_Form_Model.find({
        $and: [
          { managers_approval: "Pending" },
          { reporting_manager: req?.params?.reporting_manager },
        ],
      }).countDocuments();
      res.status(201).send({
        Total_Notification1,
      });
    }
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
