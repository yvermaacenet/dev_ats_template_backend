const Cabin_Slot_Booking_Model = require("../models/Cabin_Slot_Booking_Model");
const Cabin_Model = require("../models/Cabin_Model");

// <!=============== Cabin Slot Booking ====================>

exports.post_cabin_slot_booking = async (req, res) => {
  // console.log("req.body", req.body);
  // const token = await User_Model.generateAuthToken(verifiedToken._id);
  // const cookie = await User_Model.generateCookie(req, res, token);
  // const updateDetails = await User_Model.updateData(verifiedToken._id, {
  //   token,
  // });
  await Cabin_Slot_Booking_Model.create(req.body);
  res.status(201).send({ message: "Slot has been booked" });
};
exports.get_all_cabin_slot_booking = async (req, res) => {
  // const token = await User_Model.generateAuthToken(verifiedToken._id);
  // const cookie = await User_Model.generateCookie(req, res, token);
  // const updateDetails = await User_Model.updateData(verifiedToken._id, {
  //   token,
  // });
  const result = await Cabin_Slot_Booking_Model.find();
  res.status(201).send(result);
};
exports.get_cabin_slot_booking = async (req, res) => {
  const getCableTblsData = await Cabin_Model.find({ status: true });
  // console.log("getCableTblsData", getCableTblsData);
  const allresult = await Cabin_Slot_Booking_Model.find({
    cabin_id: getCableTblsData.map((val) => val._id),
  });
  const result = await Cabin_Slot_Booking_Model.find({
    cabin_id: req.params._id,
  });

  if (req.params._id === "all") {
    res.status(201).send(allresult);
    // console.log(allresult);
  } else {
    res.status(201).send(result);
    // console.log("result", result);
  }
};
exports.get_cabin_slot_booking_by_location = async (req, res) => {
  const allresult = await Cabin_Slot_Booking_Model.find();
  const result = await Cabin_Slot_Booking_Model.find({
    location: req.params.location,
  });
  // console.log(result);
  if (req.params.location === "all_location") {
    res.status(201).send(allresult);
    // console.log(allresult);
  } else {
    res.status(201).send(result);
    // console.log("result", result);
  }
};
exports.update_cabin_slot_booking = async (req, res) => {
  // const token = await User_Model.generateAuthToken(verifiedToken._id);
  // const cookie = await User_Model.generateCookie(req, res, token);
  // const updateDetails = await User_Model.updateData(verifiedToken._id, {
  //   token,
  // });
  await Cabin_Slot_Booking_Model.findByIdAndUpdate(
    { _id: req.params._id },
    { $set: req.body }
  );
  res.status(201).send({ message: "updated" });
};
exports.delete_cabin_slot_booking = async (req, res) => {
  // const token = await User_Model.generateAuthToken(verifiedToken._id);
  // const cookie = await User_Model.generateCookie(req, res, token);
  // const updateDetails = await User_Model.updateData(verifiedToken._id, {
  //   token,
  // });
  await Cabin_Slot_Booking_Model.findByIdAndDelete({ _id: req.params._id });
  res.status(201).send({ message: "removed" });
};
// exports.get_cabin_slot_booking_by_location = async (req, res) => {
//   const getCableTblsData = await Cabin_Model.find({ status: true });
//   console.log("getCableTblsData", req.params.location, req.params.cabin_id);
//   const allresult = await Cabin_Slot_Booking_Model.find({});
//   const resultlocationbased = await Cabin_Slot_Booking_Model.find({
//     location: req.params.location,
//   });
//   // const allresult = await Cabin_Slot_Booking_Model.find({});
//   const resultcabinbased = await Cabin_Slot_Booking_Model.find({
//     $and: [
//       { location: req.params.location },
//       { cabin_id: req.params.cabin_id },
//     ],
//   });

//   if (req.params.location === "all_location") {
//     res.status(201).send(allresult);
//     // console.log(allresult);
//   } else if (req.params.location && req.params.cabin_id === "all") {
//     res.status(201).send(resultlocationbased);
//     // console.log(allresult);
//   } else {
//     res.status(201).send(resultcabinbased);
//     // console.log("result", result);
//   }
// };
