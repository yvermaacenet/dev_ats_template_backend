const Off_Boarding_Model = require("../models/Off_Boarding_Model");
const Zoho_Model = require("../models/Zoho_Model");

exports.post_off_boarding = async (req, res) => {
  const _id = req.params._id;
  try {
    // await Off_Boarding_Model.create({
    //   ...req.body,
    //   user_id: _id,
    // });
    // if (
    //   req.body.offboarding_hr.hr_off_boarding_status === true &&
    //   req.body.offboarding_finance.finance_off_boarding_status === true &&
    //   req.body.offboarding_management.management_off_boarding_status === true
    // ) {
    //   await Zoho_Model.findByIdAndUpdate(
    //     { _id },
    //     {
    //       $set: {
    //         off_boarding_status: true,
    //         initiate_off_boarding_status: true,
    //       },
    //     },
    //     { new: true }
    //   );
    // } else {
    //   await Zoho_Model.findByIdAndUpdate(
    //     { _id },
    //     {
    //       $set: {
    //         off_boarding_status: false,
    //         initiate_off_boarding_status: true,
    //       },
    //     },
    //     { new: true }
    //   );
    // }
    res.status(201).send({ message: "created" });
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
exports.get_off_boarding = async (req, res) => {
  try {
    const get_off_boarding_list = await Off_Boarding_Model.find().select({
      // _id: 0,
      // user_id: 1,
      // "offboarding_hr.hr_off_boarding_status": 1,
      // "offboarding_finance.finance_off_boarding_status": 1,
      // "offboarding_management.management_off_boarding_status": 1,
    });
    res.status(201).send(get_off_boarding_list);
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
exports.get_off_boarding_by_id = async (req, res) => {
  const user_id = req.params._id;
  // console.log(req.params);
  try {
    const get_off_boarding_list_by_id = await Off_Boarding_Model.find({
      user_id,
    });
    // console.log("get_off_boarding_list_by_id", get_off_boarding_list_by_id);
    res.status(201).send(get_off_boarding_list_by_id);
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
exports.update_off_boarding = async (req, res) => {
  const _id = req.params._id;
  try {
    await Off_Boarding_Model.findByIdAndUpdate(
      { _id },
      { $set: { ...req.body } }
    );
    if (
      req.body.offboarding_hr.hr_off_boarding_status === true &&
      req.body.offboarding_finance.finance_off_boarding_status === true &&
      req.body.offboarding_management.management_off_boarding_status === true
    ) {
      await Zoho_Model.findByIdAndUpdate(
        { _id: req.body.user_id },

        {
          $set: {
            off_boarding_status: true,
            initiate_off_boarding_status: true,
          },
        },
        { new: true }
      );
    } else {
      await Zoho_Model.findByIdAndUpdate(
        { _id: req.body.user_id },

        {
          $set: {
            off_boarding_status: false,
            initiate_off_boarding_status: true,
          },
        },
        { new: true }
      );
    }
    res.status(201).send({ message: "updated" });
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
exports.post_off_boarding_by_status_code = async (req, res) => {
  // console.log(req?.params?.status_code);
  // console.log(req.body);
  try {
    if (req?.params?._id !== "undefined") {
      // console.log("update");
      await Off_Boarding_Model.findByIdAndUpdate(
        { _id: req?.params?._id },
        { $set: { ...req.body } }
      );
      res.status(201).send({
        message:
          req?.params?.status_code === "save"
            ? "Offboarding form has been saved successfully!"
            : req?.params?.status_code === "hr_offboarding_complete" &&
              req?.body?.offboarding_hr?.hr_off_boarding_status
            ? "HR offboarding has been completed!"
            : req?.params?.status_code === "finance_offboarding_complete" &&
              req?.body?.offboarding_finance?.finance_off_boarding_status
            ? "Finance offboarding has been completed!"
            : "Management offboarding has been completed!",
      });
    } else {
      // console.log("create");
      await Off_Boarding_Model.create({
        ...req.body,
        user_id: req.params.user_id,
      });
      res.status(201).send({
        message:
          req?.params?.status_code === "save"
            ? "Offboarding form has been saved successfully!"
            : req?.params?.status_code === "hr_offboarding_complete" &&
              req?.body?.offboarding_hr?.hr_off_boarding_status
            ? "HR offboarding has been completed!"
            : req?.params?.status_code === "finance_offboarding_complete" &&
              req?.body?.offboarding_finance?.finance_off_boarding_status
            ? "Finance offboarding has been completed!"
            : "Management offboarding has been completed!",
      });
    }
    if (
      req?.params?.status_code === "hr_offboarding_complete" ||
      req?.params?.status_code === "finance_offboarding_complete" ||
      req?.params?.status_code === "management_offboarding_complete"
    ) {
      if (
        req?.body?.offboarding_hr?.hr_off_boarding_status === true &&
        req?.body?.offboarding_finance?.finance_off_boarding_status === true &&
        req?.body?.offboarding_management?.management_off_boarding_status ===
          true
      ) {
        await Zoho_Model.findByIdAndUpdate(
          { _id: req.params.user_id },
          {
            $set: {
              off_boarding_status: true,
              initiate_off_boarding_status: true,
            },
          },
          { new: true }
        );
      } else {
        await Zoho_Model.findByIdAndUpdate(
          { _id: req.params.user_id },
          {
            $set: {
              off_boarding_status: false,
              initiate_off_boarding_status: true,
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
