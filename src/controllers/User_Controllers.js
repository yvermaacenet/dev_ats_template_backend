const On_Boarding_Model = require("../models/On_Boarding_Model");
const Zoho_Model = require("../models/Zoho_Model");

// <!=============== User ====================>
exports.user_update = async (req, res) => {
  const { _id } = req.params;

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

exports.get_user_list_by_status_code = async (req, res) => {
  const status_code = req.params.status_code;

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

exports.get_user_list_By_Id = async (req, res) => {
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
