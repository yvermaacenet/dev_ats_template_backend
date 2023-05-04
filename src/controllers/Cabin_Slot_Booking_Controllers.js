const Cabin_Slot_Booking_Model = require("../models/Cabin_Slot_Booking_Model");
const Cabin_Model = require("../models/Cabin_Model");

exports.post_cabin_slot_booking = async (req, res) => {
  await Cabin_Slot_Booking_Model.create(req.body);
  res.status(201).send({ message: "Slot has been booked" });
};
exports.get_all_cabin_slot_booking = async (req, res) => {
  const result = await Cabin_Slot_Booking_Model.find();
  res.status(201).send(result);
};
exports.get_cabin_slot_booking = async (req, res) => {
  const getCableTblsData = await Cabin_Model.find({ status: true });
  const allresult = await Cabin_Slot_Booking_Model.find({
    cabin_id: getCableTblsData.map((val) => val._id),
  });
  const result = await Cabin_Slot_Booking_Model.find({
    cabin_id: req.params._id,
  });

  if (req.params._id === "all") {
    res.status(201).send(allresult);
  } else {
    res.status(201).send(result);
  }
};
exports.get_cabin_slot_booking_by_location = async (req, res) => {
  const allresult = await Cabin_Slot_Booking_Model.find();
  const result = await Cabin_Slot_Booking_Model.find({
    location: req.params.location,
  });
  if (req.params.location === "all_location") {
    res.status(201).send(allresult);
  } else {
    res.status(201).send(result);
  }
};
exports.update_cabin_slot_booking = async (req, res) => {
  await Cabin_Slot_Booking_Model.findByIdAndUpdate(
    { _id: req.params._id },
    { $set: req.body }
  );
  res.status(201).send({ message: "updated" });
};
exports.delete_cabin_slot_booking = async (req, res) => {
  await Cabin_Slot_Booking_Model.findByIdAndDelete({ _id: req.params._id });
  res.status(201).send({ message: "removed" });
};
