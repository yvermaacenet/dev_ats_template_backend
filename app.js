require("dotenv").config({ path: __dirname + "/.env" });
require("./src/db/conn");
const express = require("express");
const cron = require("node-cron");
const app = express();
const zoho_controller = require("./src/controllers/Zoho_Controllers.js");
const db_controller = require("./src/controllers/DB_Controllers");
const port = process.env.PORT || 5502;
app.use(express.json({ limit: "50mb" }));

const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: false,
  })
);

//cron.schedule("0 12 * * *", () => {
//  console.log("zoho data fetch at 12:00 AM");
//});
// zoho_controller.compare_data_between_zoho_and_database();
//cron.schedule("02 16 * * *", () => {
//  console.log(
//    "Acenet workflow data base download at 00:00 on every 10th day-of-month"
//  );
// db_controller.db_backup();
//});

const User_Router = require("./src/routers/User_Router");
const Cabin_Router = require("./src/routers/Cabin_Router");
const Cabin_Slot_Booking_Router = require("./src/routers/Cabin_Slot_Booking_Router");
const On_Boarding_Router = require("./src/routers/On_Boarding_Router");
const Off_Boarding_Router = require("./src/routers/Off_Boarding_Router");
const Document_Counter_Router = require("./src/routers/Documents_counter_Routes");
const Form_12_BB_Router = require("./src/routers/Form_12_BB_Router");
const Form_Flexible_Benefit_Router = require("./src/routers/Form_Flexible_Benefit_Router");
const Zoho_Router = require("./src/routers/Zoho_Router");
const Location_Router = require("./src/routers/Location_Router");
const Travel_Router = require("./src/routers/Travel_Request_Form_Router");
const Airport_Router = require("./src/routers/Airport_Router");
const Email_Router = require("./src/routers/Email_Router");
const Client_project_Router = require("./src/routers/Client_Project_Router");

app.use(User_Router);
app.use(Cabin_Router);
app.use(Cabin_Slot_Booking_Router);
app.use(On_Boarding_Router);
app.use(Off_Boarding_Router);
app.use(Document_Counter_Router);
app.use(Form_12_BB_Router);
app.use(Form_Flexible_Benefit_Router);
app.use(Zoho_Router);
app.use(Location_Router);
app.use(Travel_Router);
app.use(Airport_Router);
app.use(Email_Router);
app.use(Client_project_Router);

app.listen(port, () => {
  console.log(`Connection is setup at ${port}`);
});
