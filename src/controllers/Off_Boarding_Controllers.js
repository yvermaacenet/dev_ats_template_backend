const Off_Boarding_Model = require("../models/Off_Boarding_Model");
const Zoho_Model = require("../models/Zoho_Model");

exports.post_off_boarding = async (req, res) => {
  const _id = req.params._id;
  try {
    await Off_Boarding_Model.create({
      ...req.body,
      employee_id: _id,
    });
    if (
      req.body.offboarding_hr.hr_off_boarding_status === true &&
      req.body.offboarding_finance.finance_off_boarding_status === true &&
      req.body.offboarding_management.management_off_boarding_status === true
    ) {
      await Zoho_Model.findByIdAndUpdate(
        { _id },
        {
          $set: {
            off_boarding_status: true,
            initiate_off_boarding_status: true,
          },
        },
        { new: true }
      );
    } else {
      await Zoho_Model.findByIdAndUpdate(
        { _id },
        {
          $set: {
            off_boarding_status: false,
            initiate_off_boarding_status: true,
          },
        },
        { new: true }
      );
    }
    res.status(201).send({ message: "created" });
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
exports.get_off_boarding = async (req, res) => {
  try {
    const get_off_boarding_list = await Off_Boarding_Model.find().select({
      _id: 0,
      employee_id: 1,
      "offboarding_hr.hr_off_boarding_status": 1,
      "offboarding_finance.finance_off_boarding_status": 1,
      "offboarding_management.management_off_boarding_status": 1,
    });
    res.status(201).send(get_off_boarding_list);
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
exports.get_off_boarding_by_id = async (req, res) => {
  const employee_id = req.params._id;
  try {
    const get_off_boarding_list_by_id = await Off_Boarding_Model.find({
      employee_id,
    });
    res.status(201).send(get_off_boarding_list_by_id);
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
exports.update_off_boarding = async (req, res) => {
  const _id = req.params._id;
  try {
    await Off_Boarding_Model.findByIdAndUpdate(
      { _id },
      { $set: { ...req.body } }
    );
    if (
      req.body.offboarding_hr.hr_off_boarding_status === true &&
      req.body.offboarding_finance.finance_off_boarding_status === true &&
      req.body.offboarding_management.management_off_boarding_status === true
    ) {
      await Zoho_Model.findByIdAndUpdate(
        { _id: req.body.employee_id },

        {
          $set: {
            off_boarding_status: true,
            initiate_off_boarding_status: true,
          },
        },
        { new: true }
      );
    } else {
      await Zoho_Model.findByIdAndUpdate(
        { _id: req.body.employee_id },

        {
          $set: {
            off_boarding_status: false,
            initiate_off_boarding_status: true,
          },
        },
        { new: true }
      );
    }
    res.status(201).send({ message: "updated" });
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
