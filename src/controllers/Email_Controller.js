const AWS = require("aws-sdk");
require("dotenv").config();

const configSES = {
  apiVersion: "2010-12-01",
  region: "ap-south-1",
};

AWS.config.update(configSES);

exports.Email_Controller = async (req, res) => {
  const { user, email, start_date, destination, reason_for_travel } = req.body;

  //email to be sent to the person who created the request
  const emailParams = {
    Destination: {
      ToAddresses: [email],
    },
    Source: "system@acenet.io",
    Template: "Travel_Request",
    TemplateData: JSON.stringify({
      user: "yogendra@acenet.io",
      start_date: start_date,
      destination: destination,
      reason_for_travel: reason_for_travel,
    }),
  };
  //email to be sent to the Managementteam for the approval
  const ManagementParams = {
    Destination: {
      //   ToAddresses: ["amit@acenet.io","manishg@acenet.io","manish@acenet.io", "sunil@acenet.io", "vasanth@acenet.io"],
      ToAddresses: ["yogendra@acenet.io"],
    },
    Source: "system@acenet.io",
    Template: "Management_Leave_Request",
    TemplateData: JSON.stringify({
      user: user,
      start_date: start_date,
      destination: destination,
      reason_for_travel: reason_for_travel,
    }),
  };
  try {
    let sendPromise = new AWS.SES().sendTemplatedEmail(emailParams).promise();
    let sendManagementPromise = new AWS.SES()
      .sendTemplatedEmail(ManagementParams)
      .promise();

    sendPromise
      .then(function (data) {
        console.log(data.MessageId);
        sendManagementPromise
          .then(function (data) {
            console.log(data.MessageId);
            res.status(201).json({ message: "Email has been sent" });
          })
          .catch(function (err) {
            console.error(err, err.stack);
            res.status(500).json({
              message: "Something Went Wrong",
            });
          });
      })
      .catch(function (err) {
        console.error(err, err.stack);
        res.status(500).json({ message: "Something Went Wrong" });
      });
  } catch (error) {
    console.error("Error creating email template:", error);
  }
};
exports.Email_Status_Controller = async (req, res) => {
  const {
    user,
    status,
    current_date,
    start_date,
    end_date,
    destination,
    reason_for_travel,
  } = req.body;

  //email to be sent to the person who created the request
  const emailParams = {
    Destination: {
      ToAddresses: ["akshay@acenet.io"],
    },
    Source: "system@acenet.io",
    Template: "User_Confirmation_Email",
    TemplateData: JSON.stringify({
      user: user,
      status: status,
      current_date: current_date,
      start_date: start_date,
      end_date: end_date,
      destination: destination,
      reason_for_travel: reason_for_travel,
    }),
  };
  //email to be sent to the Managementteam for the approval
  //   const ManagementParams = {
  //     Destination: {
  //       //   ToAddresses: ["amit@acenet.io","manishg@acenet.io","manish@acenet.io", "sunil@acenet.io", "vasanth@acenet.io"],
  //       ToAddresses: ["akshay@acenet.io"],
  //     },
  //     Source: "system@acenet.io",
  //     Template: "Management_Leave_Request",
  //     TemplateData: JSON.stringify({
  //       user: user,
  //       start_date: start_date,
  //       end_date: end_date,
  //       destination: destination,
  //       reason_for_travel: reason_for_travel,
  //     }),
  //   };
  try {
    let sendPromise = new AWS.SES().sendTemplatedEmail(emailParams).promise();
    // let sendManagementPromise = new AWS.SES()
    //   .sendTemplatedEmail(ManagementParams)
    //   .promise();

    sendPromise.then(function (data) {
      console.log(data.MessageId);
      //     sendManagementPromise
      //       .then(function (data) {
      //         console.log(data.MessageId);
      //         res.status(201).json({ message: "Email has been sent" });
      //       })
      //       .catch(function (err) {
      //         console.error(err, err.stack);
      //         res.status(500).json({
      //           message: "Something Went Wrong",
      //         });
      //       });
      //   })
      //   .catch(function (err) {
      //     console.error(err, err.stack);
      res.status(500).json({ message: "Sent" });
    });
  } catch (error) {
    console.error("Error creating email template:", error);
  }
};
