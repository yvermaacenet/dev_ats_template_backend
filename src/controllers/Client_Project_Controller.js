const Client_Project = require("../models/Client_Project_Model");
const Client_Model = require("../models/Clients_Model");

exports.client_project_controller = async (req, res) => {
  try {
    const getCountry = await Client_Project.find();

    res.status(201).send(getCountry);
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
exports.client_controller = async (req, res) => {
  try {
    const getClient = await Client_Model.find();

    res.status(201).send(getClient);
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
