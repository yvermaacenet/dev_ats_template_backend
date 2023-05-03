const Form_Flexi_Model = require("../models/Form_flexi_benfit_Model");

exports.form_flexi_controller = async (req, res) => {
  try {
    const userExist = await Form_Flexi_Model.findOne({ email: req.body.email });
    const userExistWithID = await Form_Flexi_Model.findOne({
      emp_id: req.body.emp_id,
    });

    if (userExist) {
      return res.json({ message: "Email already exist" });
    }
    if (userExistWithID) {
      return res.json({ message: "Employee Id already exist" });
    }

    await Form_Flexi_Model.create(req.body);

    res.status(201).json({ message: "Form has been submitted" });
  } catch (err) {
    res.status(404).json(err);
  }
};

exports.get_form_flexi_controller = async (req, res) => {
  try {
    const result = await Form_Flexi_Model.find();
    res.status(201).send(result);
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
exports.get_form_flexi_controller_by_id = async (req, res) => {
  try {
    const employees = await Form_Flexi_Model.find({
      user_id: req?.params?._id,
    }).select({ _id: 0 });
    res.json(employees);
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
