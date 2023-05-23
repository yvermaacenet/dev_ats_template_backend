const location_model = require("../models/Location_Model");

exports.post_new_location = async (req, res) => {
  const name = req.body.name;
  const cityExist = await location_model.findOne({ name: name });
  if (!cityExist || cityExist === null) {
    await location_model.create(req.body);
    res.status(201).send({ message: "created" });
  } else {
    res.status(200).send({ message: "Already Existed" });
  }
};

exports.get_location_list = async (req, res) => {
  try {
    const location_list = await location_model.find();
    res.status(201).send(location_list);
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
