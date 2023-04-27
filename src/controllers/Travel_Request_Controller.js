const auth = require("../middleware/auth");
const Travel_Request_Form_Model = require("../models/TravelRequest_Model");
// <!=============== Cabin   ====================>
exports.post_travel_request = async (req, res) => {
  console.log(req.body);
  try {
    await Travel_Request_Form_Model.create(req.body);
    res.status(201).send("updated");
  } catch (error) {
    // console.log(error);
    res.status(404).send({ message: error });
  }
};
exports.get_travel_request = async (req, res) => {
  try {
    const data = await Travel_Request_Form_Model.find();
    console.log(data);
    res.status(201).send(data);
  } catch (error) {
    // console.log(error);
    res.status(404).send({ message: error });
  }
};
exports.put_travel_request = async (req, res) => {
  console.log(req.params._id);
  try {
    const data = await Travel_Request_Form_Model.findByIdAndUpdate(
      { _id: req.params._id },
      { $set: req.body }
    );
    console.log(data);
    res.status(201).send("Updated Sucessfully");
  } catch (error) {
    // console.log(error);
    res.status(404).send({ message: error });
  }
};
exports.get_travel_request_by_id = async (req, res) => {
  console.log(req.params._id);
  try {
    const data = await Travel_Request_Form_Model.findById({
      _id: req.params._id,
    });
    console.log(data);
    res.status(201).send(data);
  } catch (error) {
    // console.log(error);
    res.status(404).send({ message: error });
  }
};
