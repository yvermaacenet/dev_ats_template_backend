// const TaxForm = require("../models/Form_12_BB_Model");
const Form_12_BB_Model = require("../models/Form_12_BB_Model");

exports.form_12_bb_controller = async (req, res) => {
  try {
    // const userExist = await TaxForm.findOne({ email: req.body.email });
    // const userExistWithID = await TaxForm.findOne({
    //   emp_id: req.body.emp_id,
    // });

    await Form_12_BB_Model.create(req.body);
    res.status(201).json({ message: "Form has been submitted" });
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
exports.update_form_12_bb_controller_by_id = async (req, res) => {
  const _id = req.params._id;
  if (_id === "undefined") {
    try {
      // const userExist = await TaxForm.findOne({ email: req.body.email });
      // const userExistWithID = await TaxForm.findOne({
      //   emp_id: req.body.emp_id,
      // });
      await Form_12_BB_Model.create(req.body);
      res.status(201).json({ message: "Form has been submitted successfully" });
    } catch (error) {
      res.status(404).send({ message: error });
    }
  } else {
    try {
      await Form_12_BB_Model.findByIdAndUpdate(
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

exports.get_form_12_bb_controller = async (req, res) => {
  try {
    const result = await Form_12_BB_Model.find();
    res.status(201).send(result);
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
exports.get_form_12_bb_controller_by_id = async (req, res) => {
  try {
    const employees = await Form_12_BB_Model.find({
      user_id: req?.params?._id,
    });
    res.json(employees);
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
