const Form_Flexible_Benefit_Model = require("../models/Form_Flexible_Benefit_Model");

exports.form_flexi_controller = async (req, res) => {
  try {
    const userExist = await Form_Flexible_Benefit_Model.findOne({
      email: req.body.email,
    });
    const userExistWithID = await Form_Flexible_Benefit_Model.findOne({
      emp_id: req.body.emp_id,
    });

    if (userExist) {
      return res.json({ message: "Email already exist" });
    }
    if (userExistWithID) {
      return res.json({ message: "Employee Id already exist" });
    }

    await Form_Flexible_Benefit_Model.create(req.body);

    res.status(201).json({ message: "Form has been submitted" });
  } catch (err) {
    res.status(404).json(err);
  }
};
exports.update_form_flexible_benefit_controller_by_id = async (req, res) => {
  const _id = req.params._id;
  if (_id === "undefined") {
    try {
      await Form_Flexible_Benefit_Model.create(req.body);
      res.status(201).json({ message: "Form has been submitted successfully" });
    } catch (error) {
      res.status(404).json(error);
    }
  } else {
    try {
      await Form_Flexible_Benefit_Model.findByIdAndUpdate(
        { _id },
        { $set: req.body },
        { new: true }
      );
      res.status(201).json({ message: "Form has been submitted successfully" });
    } catch (error) {
      res.status(404).send({ message: error });
    }
  }
};
exports.get_form_flexi_controller = async (req, res) => {
  try {
    const result = await Form_Flexible_Benefit_Model.find();
    res.status(201).send(result);
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
exports.get_form_flexi_controller_by_id = async (req, res) => {
  try {
    const employees = await Form_Flexible_Benefit_Model.find({
      user_id: req?.params?._id,
    });
    res.json(employees);
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
