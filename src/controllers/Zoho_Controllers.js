const { default: axios } = require("axios");
const Zoho_Model = require("../models/Zoho_Model");
const fs = require("fs");

exports.sign_in_zoho = async (req, res) => {
  try {
    const authUrl = `${process.env.ZOHO_DOMAIN}/v2/auth?scope=AaaServer.profile.READ,ZohoPeople.employee.ALL,ZohoPeople.forms.ALL&prompt=consent&client_id=${process.env.ClIENT_ID}&response_type=code&access_type=offline&redirect_uri=${process.env.REDIRECT_URL}`;
    const response = await axios.get(authUrl);
    res.status(201).send(response?.request?._redirectable?._currentUrl);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.sign_in_zoho_get_access_token = async (req, res) => {
  const code = req.params.code;
  try {
    if (code) {
      const authUrl = `${process.env.ZOHO_DOMAIN}/v2/token?grant_type=${process.env.GRANT_TYPE}&client_id=${process.env.ClIENT_ID}&client_secret=${process.env.ClIENT_SECRET}&redirect_uri=${process.env.REDIRECT_URL}&code=${code}`;
      const response = await axios.post(authUrl);
      if (response?.data?.access_token) {
        const response2 = await axios.get(
          "https://accounts.zoho.in/oauth/user/info",
          {
            headers: {
              Authorization: `Zoho-oauthtoken ${response?.data?.access_token}`,
            },
          }
        );
        const envData = fs.readFileSync(".env", "utf8");
        const newEnvData = envData.replace(
          /REFRENCE_TOKEN\s*=\s*".*"/,
          `REFRENCE_TOKEN="${response?.data?.refresh_token}"`
        );
        fs.writeFileSync(".env", newEnvData);
        const userDetails = await Zoho_Model?.find({
          "Email address": response2?.data?.Email,
        }).select({
          "First Name": 1,
          "Email address": 1,
          _id: 1,
          "Employee ID": 1,
          "Reporting Manager": 1,
          "Zoho Role": 1,
          "Acenet Role": 1,
          Department: 1,
          Photo: 1,
          "Personal Mobile Number": 1,
        });
        const generate_auth_token = await Zoho_Model.generateAuthToken(
          userDetails[0]?._id.toString()
        );
        const cookie = await Zoho_Model.generateCookie(
          req,
          res,
          generate_auth_token
        );
        res.send({
          name: userDetails[0]["First Name"],
          email: userDetails[0]["Email address"],
          message: "loggedin successfully",
          user_id: userDetails[0]?._id,
          emp_id: userDetails[0]["Employee ID"],
          department: userDetails[0]?.Department,
          photo: userDetails[0]?.Photo,
          phone: userDetails[0]["Personal Mobile Number"],
          zoho_role:
            userDetails[0]["Acenet Role"] === ""
              ? "Team member"
              : userDetails[0]["Acenet Role"],
          generate_auth_token,
          reporting_manager: userDetails[0]["Reporting Manager"],
        });
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.compare_data_between_zoho_and_database = async (req, res) => {
  try {
    const authUrl = `${process.env.ZOHO_DOMAIN}/v2/token?refresh_token=${process.env.REFRENCE_TOKEN}&client_id=${process.env.ClIENT_ID}&client_secret=${process.env.ClIENT_SECRET}&grant_type=refresh_token`;
    const response = await axios.post(authUrl);
    if (response?.data?.access_token) {
      const record = await axios.get(
        "https://people.zoho.in/people/api/forms/P_EmployeeView/records",
        {
          headers: {
            Authorization: `Zoho-oauthtoken ${response?.data?.access_token}`,
          },
        }
      );
      const userDetails = await Zoho_Model?.find();

      const gettingDataForUpdateByEmail = [];
      function compareData(obj1, obj2) {
        var resp1 = {};
        var resp2 = {};
        var finalResp = {};
        for (var i in obj2) {
          if (!obj1.hasOwnProperty(i) && obj2[i] !== obj1[i]) {
            resp1[i] = obj2[i];
            resp2["Email address"] = obj2["Email address"];
            finalResp = { ...resp2, ...resp1 };
          }
        }
        gettingDataForUpdateByEmail.push(finalResp);
      }
      userDetails.map((val) =>
        record?.data?.map((res) => {
          if (val["Email address"] === res["Email address"]) {
            return compareData(val, res);
          }
        })
      );
      const newData = await (
        await record.data.filter(
          (val) =>
            !userDetails?.some(
              (res) => res["Email address"] === val["Email address"]
            )
        )
      ).map((val) => {
        (val.initiate_on_boarding_status = false),
          (val.initiate_off_boarding_status = false),
          (val.on_boarding_status = false),
          (val.off_boarding_status = false);

        return val;
      });
      if (gettingDataForUpdateByEmail) {
        gettingDataForUpdateByEmail?.map(async (val) => {
          await Zoho_Model.updateOne(
            { "Email address": val["Email address"] },
            { $set: val },
            { new: true }
          );
        });
      }
      if (newData) {
        Zoho_Model.create(newData);
      }
      console.log("zoho data fetch at 12:00 AM");
    }
  } catch (error) {
    console.log("error", error);
  }
};

exports.get_zoho_data = async (req, res) => {
  try {
    const userDetails = await Zoho_Model.find();
    res.status(200).send(userDetails);
  } catch (error) {
    res.status(400).send(error);
  }
};
