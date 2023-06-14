const On_Boarding_Model = require("../models/On_Boarding_Model");
const Zoho_Model = require("../models/Zoho_Model");
exports.post_on_boarding = async (req, res) => {
  const _id = req.params._id;
  console.log(req.body);
  try {
    await On_Boarding_Model.create({
      ...req.body,
      user_id: _id,
    });

    if (
      req.body.hr.hr_on_boarding_status === true &&
      req.body.finance.finance_on_boarding_status === true
    ) {
      await Zoho_Model.findByIdAndUpdate(
        { _id },
        {
          $set: { on_boarding_status: true, initiate_on_boarding_status: true },
        },
        { new: true }
      );
    } else {
      await Zoho_Model.findByIdAndUpdate(
        { _id },
        {
          $set: {
            on_boarding_status: false,
            initiate_on_boarding_status: true,
          },
        },
        { new: true }
      );
    }
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
      "hr.hr_on_boarding_status": 1,
      "finance.finance_on_boarding_status": 1,
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
      req.body.hr.hr_on_boarding_status === true &&
      req.body.finance.finance_on_boarding_status === true
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

exports.post_on_boarding_by_status_code = async (req, res) => {
  // const _id = req.params._id;
  // console.log(req?.params);
  // console.log(req.body.hr.hr_on_boarding_status);
  try {
    if (req?.params?._id !== "undefined") {
      await On_Boarding_Model.findByIdAndUpdate(
        { _id: req?.params?._id },
        { $set: { ...req.body } }
      );
      res.status(201).send({
        message:
          req?.params?.status_code === "save"
            ? "Onboarding form has been saved successfully!"
            : req?.params?.status_code === "hr_onboarding_complete" &&
              req?.body?.hr?.hr_on_boarding_status
            ? "HR onboarding has been completed!"
            : "Finance onboarding has been completed!",
      });
    } else {
      await On_Boarding_Model.create({
        ...req.body,
        user_id: req.params.user_id,
      });
      res.status(201).send({
        message:
          req?.params?.status_code === "save"
            ? "Onboarding form has been saved successfully!"
            : req?.params?.status_code === "hr_onboarding_complete" &&
              req?.body?.hr?.hr_on_boarding_status
            ? "HR onboarding has been completed!"
            : "Finance onboarding has been completed!",
      });
    }
    if (
      req?.params?.status_code === "hr_onboarding_complete" ||
      req?.params?.status_code === "finance_onboarding_complete"
    ) {
      // console.log(
      //   "gg",
      //   req.body.hr.hr_on_boarding_status,
      //   req.body.finance.finance_on_boarding_status
      // );
      if (
        req?.body?.hr?.hr_on_boarding_status === true &&
        req?.body?.finance?.finance_on_boarding_status === true
      ) {
        await Zoho_Model.findByIdAndUpdate(
          { _id: req.params.user_id },
          {
            $set: {
              on_boarding_status: true,
              initiate_on_boarding_status: true,
            },
          },
          { new: true }
        );
      } else {
        await Zoho_Model.findByIdAndUpdate(
          { _id: req.params.user_id },
          {
            $set: {
              on_boarding_status: false,
              initiate_on_boarding_status: true,
            },
          },
          { new: true }
        );
      }
    }
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
