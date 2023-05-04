const auth = require("../middleware/auth");
const Travel_Request_Form_Model = require("../models/TravelRequest_Model");
// <!=============== Cabin   ====================>
exports.post_travel_request = async (req, res) => {
  try {
    await Travel_Request_Form_Model.create(req.body);
    res.status(201).send("updated");
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
exports.get_travel_request = async (req, res) => {
  try {
    const data = await Travel_Request_Form_Model.find();
    res.status(201).send(data);
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
exports.put_travel_request = async (req, res) => {
  try {
    const data = await Travel_Request_Form_Model.findByIdAndUpdate(
      { _id: req.params._id },
      { $set: req.body }
    );
    res.status(201).send("Updated Sucessfully");
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
exports.get_travel_request_by_id = async (req, res) => {
  try {
    const data = await Travel_Request_Form_Model.findById({
      _id: req.params._id,
    });
    res.status(201).send(data);
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
exports.get_travel_request_by_email_id = async (req, res) => {
  try {
    const data = await Travel_Request_Form_Model.find({
      email: req.params.email_id,
    });
    res.status(201).send(data);
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
