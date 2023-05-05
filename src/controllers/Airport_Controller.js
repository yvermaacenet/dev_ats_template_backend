const Airport_Model = require("../models/Airport_Model");

exports.get_airport = async (req, res) => {
  try {
    const getCountry = await Airport_Model.find().select({
      _id: 0,
      country_code: 1,
    });
    const uniqueCountryCodes = [
      ...new Set(getCountry.map((item) => item.country_code)),
    ];

    console.log("uniqueCountryCodes", uniqueCountryCodes);
    const result = await Airport_Model.find();

    res.status(201).send(result);
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
