const Cabin_Slot_Booking_Model = require("../models/Cabin_Slot_Booking_Model");
const Cabin_Model = require("../models/Cabin_Model");

exports.post_cabin_list = async (req, res) => {
  await Cabin_Model.create(req.body);
  res.status(201).send({ message: "created" });
};
exports.get_cabin_list = async (req, res) => {
  const cabin_list = await Cabin_Model.find();
  res.status(201).send(cabin_list);
};
exports.get_active_cabin_list = async (req, res) => {
  const cabin_list = await Cabin_Model.find({ status: true });
  res.status(201).send(cabin_list);
};
exports.get_cabin_list_by_id = async (req, res) => {
  const cabin_list = await Cabin_Model.findById({ _id: req.params._id });
  res.status(201).send(cabin_list);
};
exports.update_cabin_list = async (req, res) => {
  try {
    await Cabin_Model.findByIdAndUpdate(
      { _id: req.params._id },
      { $set: req.body }
    );
    res.status(201).send({ message: "updated" });
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
