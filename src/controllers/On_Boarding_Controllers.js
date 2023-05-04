const On_Boarding_Model = require("../models/On_Boarding_Model");
const Zoho_Model = require("../models/Zoho_Model");
exports.post_on_boarding = async (req, res) => {
  const _id = req.params._id;
  try {
    await On_Boarding_Model.create({
      ...req.body,
      user_id: _id,
    });
    res.status(201).send({ message: "created" });
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
exports.get_on_boarding = async (req, res) => {
  try {
    const get_on_boarding_list = await On_Boarding_Model.find().select({
      _id: 0,
      user_id: 1,
      hr_on_boarding_status: 1,
      finance_on_boarding_status: 1,
      management_on_boarding_status: 1,
    });
    res.status(201).send(get_on_boarding_list);
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
exports.get_on_boarding_by_id = async (req, res) => {
  const user_id = req.params._id;
  try {
    const get_on_boarding_list_by_id = await On_Boarding_Model.find({
      user_id,
    });
    res.status(201).send(get_on_boarding_list_by_id);
  } catch (error) {
    // console.log(error);
    res.status(404).send({ message: error });
  }
  // const token = await Admin_Model.generateAuthToken(verifiedToken._id);
  // const cookie = await Admin_Model.generateCookie(req, res, token);
  // await Admin_Model.updateData(verifiedToken._id, {
  //   token,
  // });
};
exports.update_on_boarding = async (req, res) => {
  const _id = req.params._id;
  try {
    await On_Boarding_Model.findByIdAndUpdate(
      { _id },
      { $set: { ...req.body } }
    );
    if (
      req.body.hr_on_boarding_status === true &&
      req.body.finance_on_boarding_status === true &&
      req.body.management_on_boarding_status === true
    ) {
      await Zoho_Model.findByIdAndUpdate(
        { _id: req.body.user_id },
        {
          $set: { on_boarding_status: true },
        },
        { new: true }
      );
    } else {
      await Zoho_Model.findByIdAndUpdate(
        { _id: req.body.user_id },
        {
          $set: { on_boarding_status: false },
        },
        { new: true }
      );
    }

    res.status(201).send({ message: "updated" });
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
