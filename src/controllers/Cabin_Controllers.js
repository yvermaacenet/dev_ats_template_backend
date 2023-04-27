const Cabin_Slot_Booking_Model = require("../models/Cabin_Slot_Booking_Model");
const Cabin_Model = require("../models/Cabin_Model");

// <!=============== Cabin   ====================>
exports.post_cabin_list = async (req, res) => {
  // const token = await Admin_Model.generateAuthToken(verifiedToken._id);
  // const cookie = await Admin_Model.generateCookie(req, res, token);
  // await Admin_Model.updateData(verifiedToken._id, {
  //   token,
  // });
  // const hexColor = `#${Math.random().toString(16).slice(2, 8).padEnd(6, 0)}`;
  // console.log("xasa", req.body);
  await Cabin_Model.create(req.body);
  res.status(201).send({ message: "created" });
};
exports.get_cabin_list = async (req, res) => {
  // const token = await Admin_Model.generateAuthToken(verifiedToken._id);
  // const cookie = await Admin_Model.generateCookie(req, res, token);
  // await Admin_Model.updateData(verifiedToken._id, {
  //   token,
  // });
  const cabin_list = await Cabin_Model.find();
  res.status(201).send(cabin_list);
};
exports.get_active_cabin_list = async (req, res) => {
  // const token = await Admin_Model.generateAuthToken(verifiedToken._id);
  // const cookie = await Admin_Model.generateCookie(req, res, token);
  // await Admin_Model.updateData(verifiedToken._id, {
  //   token,
  // });
  const cabin_list = await Cabin_Model.find({ status: true });
  res.status(201).send(cabin_list);
};
exports.get_cabin_list_by_id = async (req, res) => {
  // const token = await Admin_Model.generateAuthToken(verifiedToken._id);
  // const cookie = await Admin_Model.generateCookie(req, res, token);
  // await Admin_Model.updateData(verifiedToken._id, {
  //   token,
  // });
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
