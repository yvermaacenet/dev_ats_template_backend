const AWS = require("aws-sdk");
require("dotenv").config();

const configSES = {
  apiVersion: "2010-12-01",
  accessKeyId: process.env.ACCEESS_KEY_SES,
  secretAccessKey: process.env.SECRET_KEY_SES,
  region: "ap-south-1",
};

AWS.config.update(configSES);

exports.Email_Controller = async (req, res) => {
  const {
    user,
    email,
    basicDetails,
    rows,
    travellersData,
    accommodationData,
    roomsData,
  } = req.body;

  const recipients = [];

  // Loop through the users and emails arrays to create recipient objects
  for (let i = 0; i < user.length; i++) {
    const recipient = {
      Destination: {
        ToAddresses: [email[i]],
      },
      ReplacementTemplateData: JSON.stringify({
        user: user[i],
        basicDetails: basicDetails,
        rows: rows,
        travellersData: travellersData,
        accommodationData: accommodationData,
        roomsData: roomsData,
      }),
    };

    recipients.push(recipient);
  }

  //email to be sent to the Management team for approval
  const ManagementParams = {
    Destination: {
      ToAddresses: [process.env.LEADERSHIP],
    },
    Source: "system@acenet.io",
    Template: "Management_Leave_Request",
    TemplateData: JSON.stringify({
      basicDetails: basicDetails,
      rows: rows,
      travellersData: travellersData,
      accommodationData: accommodationData,
      roomsData: roomsData,
    }),
  };

  try {
    if (process.env.ENVIRONMENT === "prod") {
      const sendBulkEmailParams = {
        Source: "system@acenet.io",
        Destinations: recipients,
        Template: "Travel_Request_New_Template", // Replace with your SES template name
        DefaultTemplateData: JSON.stringify({
          user: "",
          basicDetails: basicDetails,
          rows: rows,
          travellersData: travellersData,
          accommodationData: accommodationData,
          roomsData: roomsData,
        }),
      };

      let sendPromise = new AWS.SES()
        .sendBulkTemplatedEmail(sendBulkEmailParams)
        .promise();
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
    } else {
      res.status(200).json({ message: "Email sent in dev environment" });
    }
  } catch (error) {
    console.error("Error creating email template:", error);
  }
};

exports.Email_Status_Controller = async (req, res) => {
  const {
    user,
    email,
    status,
    basicDetails,
    rows,
    travellersData,
    accommodationData,
    roomsData,
  } = req.body;

  const recipients = [];

  // Loop through the users and emails arrays to create recipient objects
  for (let i = 0; i < user.length; i++) {
    const recipient = {
      Destination: {
        ToAddresses: [email[i]],
      },
      ReplacementTemplateData: JSON.stringify({
        user: user[i],
        status: status,
      }),
    };

    recipients.push(recipient);
  }

  if (process.env.ENVIRONMENT === "prod") {
    const sendBulkEmailParams = {
      Source: "system@acenet.io",
      Destinations: recipients,
      Template: "Travel_Confirmation_Email", // Replace with your SES template name
      DefaultTemplateData: JSON.stringify({
        user: "",
        status: "",
        email: "",
      }),
    };

    const ManagementParams = {
      Destination: {
        ToAddresses: [process.env.GROUPLA],
      },
      Source: "system@acenet.io",
      Template: "Groupla_Email_Template",
      TemplateData: JSON.stringify({
        basicDetails: basicDetails,
        rows: rows,
        travellersData: travellersData,
        accommodationData: accommodationData,
      }),
    };

    try {
      // let sendPromise = new AWS.SES().sendTemplatedEmail(emailParams).promise();

      if (status !== "Approved") {
        let sendPromise = new AWS.SES()
          .sendBulkTemplatedEmail(sendBulkEmailParams)
          .promise();
        sendPromise.then(function (data) {
          console.log(data.MessageId);

          res.status(200).json({ message: "Sent" });
        });
      } else {
        let sendPromise = new AWS.SES()
          .sendBulkTemplatedEmail(sendBulkEmailParams)
          .promise();
        let sendManagementPromise = new AWS.SES()
          .sendTemplatedEmail(ManagementParams)
          .promise();
        sendPromise.then(function (data) {
          console.log(data.MessageId);
          sendManagementPromise
            .then(function (data) {
              console.log(data.MessageId);
              res
                .status(201)
                .json({ message: "Email has been sent To Groupla" });
            })
            .catch(function (err) {
              console.error(err, err.stack);
              res.status(500).json({
                message: "Something Went Wrong",
              });
            });
        });
      }
    } catch (error) {
      console.error("Error creating email template:", error);
    }
  }
};
