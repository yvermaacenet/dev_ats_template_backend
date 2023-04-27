const TaxForm = require("../models/Form_12_BB_Model");
const Form_12_BB_Controller = require("../models/Form_12_BB_Model");

exports.form_12_bb_controller = async (req, res) => {
  // console.log(req.body);
  try {
    const userExist = await TaxForm.findOne({ email: req.body.email }); //check if email is already availble in the table
    const userExistWithID = await TaxForm.findOne({
      emp_id: req.body.emp_id,
    }); //check if emp_id is already availble in the table

    // if (userExist) {
    //   return res.json({ message: "Email already exist" });
    // }
    // if (userExistWithID) {
    //   return res.json({ message: "Employee Id already exist" });
    // }
    await Form_12_BB_Controller.create(req.body);
    res.status(201).json({ message: "Form has been submitted" });
  } catch (error) {
    // console.log(error);
    res.status(404).send({ message: error });
  }
};
exports.update_form_12_bb_controller_by_id = async (req, res) => {
  // console.log(req.params._id);
  try {
    await Form_12_BB_Controller.findByIdAndUpdate(
      { _id: req.params._id },
      { $set: req.body },
      { new: true }
    );
    res.status(201).json({ message: "Form has been submitted" });
  } catch (error) {
    // console.log(error);
    res.status(404).send({ message: error });
  }
  // res.status(200).send({ message: "error" });
};

exports.get_form_12_bb_controller = async (req, res) => {
  try {
    const result = await TaxForm.find();
    // console.log("result", result);
    res.status(201).send(result);
  } catch (error) {
    // console.log(error);
    res.status(404).send({ message: error });
  }
};
exports.get_form_12_bb_controller_by_id = async (req, res) => {
  try {
    const employees = await TaxForm.find({ user_id: req?.params?._id });
    res.json(employees);
    // const result = await TaxForm.find(
    //   {
    //     _id: req?.params?._id,
    //   },
    //   { projection: { _id: 0 } }
    // ).select({ _id: 0 });
    // res.status(201).send(result);
  } catch (error) {
    // console.log(error);
    res.status(404).send({ message: error });
  }
};
