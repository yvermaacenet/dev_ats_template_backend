const TaxForm = require("../models/Form_12_BB_Model");
const Form_12_BB_Controller = require("../models/Form_12_BB_Model");

exports.form_12_bb_controller = async (req, res) => {
  try {
    const userExist = await TaxForm.findOne({ email: req.body.email });
    const userExistWithID = await TaxForm.findOne({
      emp_id: req.body.emp_id,
    });

    await Form_12_BB_Controller.create(req.body);
    res.status(201).json({ message: "Form has been submitted" });
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
exports.update_form_12_bb_controller_by_id = async (req, res) => {
  try {
    await Form_12_BB_Controller.findByIdAndUpdate(
      { _id: req.params._id },
      { $set: req.body },
      { new: true }
    );
    res.status(201).json({ message: "Form has been submitted" });
  } catch (error) {
    res.status(404).send({ message: error });
  }
};

exports.get_form_12_bb_controller = async (req, res) => {
  try {
    const result = await TaxForm.find();
    res.status(201).send(result);
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
exports.get_form_12_bb_controller_by_id = async (req, res) => {
  try {
    const employees = await TaxForm.find({ user_id: req?.params?._id });
    res.json(employees);
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
